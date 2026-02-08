import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTransaction, getTransactionById, updateTransaction } from "../../api/transactionApi";
import { getLoans } from "../../api/loanApi";
import LoanHistory from "./LoanHistory";
import PageToolbar from "../../components/PageToolbar";
import FormRow from "../../components/FormRow";

const TransactionForm = () => {
    const [transaction, setTransaction] = useState({
        loan: "",
        type: "",
        amount: 0,
        description: "",
        transactionDate: ""
    });

    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const typeOptions = ["Repayment", "Late Fee", "Penalty"];

    useEffect(() => {
        const fetchData = async () => {
            const loanData = await getLoans();
            setLoans(loanData);

            if (id) {
                const txData = await getTransactionById(id);
                setTransaction({
                    loan: txData.loan?._id || "",
                    type: txData.type || "",
                    amount: txData.amount || 0,
                    description: txData.description || "",
                    transactionDate: txData.transactionDate ? txData.transactionDate.slice(0, 10) : ""
                });
            }
        };

        fetchData();
    }, [id]);

    // Selected loan object
    const selectedLoan = loans.find((l) => l._id === transaction.loan);
    const remainingBalance = selectedLoan?.balance || 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({
            ...transaction,
            [name]: name === "amount" ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const amount = Number(transaction.amount);

        // Check balance only if type is "Repayment"
        if (transaction.type === "Repayment" && amount > remainingBalance) {
            alert(`Amount cannot exceed remaining loan balance: ${remainingBalance}`);
            return;
        }

        const payload = {
            ...transaction,
            amount,
            transactionDate: transaction.transactionDate ? new Date(transaction.transactionDate) : new Date()
        };

        try {
            if (id) await updateTransaction(id, payload);
            else await createTransaction(payload);
            navigate("/transactions");
        } catch (err) {
            console.error(err);
            alert("Error saving transaction");
        }
    };

    return (
        <>
            <PageToolbar title={id ? "Edit Transaction" : "Add Transaction"} />
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">

                    {/* Loan selection */}
                    <FormRow label="Loan">
                        <select
                            name="loan"
                            value={transaction.loan}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Loan</option>
                            {loans.map((l) => (
                                <option key={l._id} value={l._id}>
                                    {l.borrower?.fullName ? `${l.borrower.fullName}-${l.amount}` : `Unknown-${l.amount}`}
                                </option>
                            ))}
                        </select>
                        {selectedLoan && transaction.type === "Repayment" && (
                            <p className="text-sm text-gray-600 mt-1">
                                Remaining Balance: {remainingBalance}
                            </p>
                        )}
                    </FormRow>

                    {/* Type */}
                    <FormRow label="Type">
                        <select
                            name="type"
                            value={transaction.type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Type</option>
                            {typeOptions.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </FormRow>

                    {/* Amount */}
                    <FormRow label="Amount">
                        <input
                            type="number"
                            name="amount"
                            value={transaction.amount}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                            min="0"
                            max={transaction.type === "Repayment" ? remainingBalance : undefined} // optional
                        />
                    </FormRow>

                    {/* Description */}
                    <FormRow label="Description">
                        <input
                            type="text"
                            name="description"
                            value={transaction.description}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    {/* Transaction Date */}
                    <FormRow label="Transaction Date">
                        <input
                            type="date"
                            name="transactionDate"
                            value={transaction.transactionDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </FormRow>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                        >
                            {id ? "Update" : "Create"}
                        </button>
                    </div>

                </form>
            </div>

            <div className="p-4">
                <LoanHistory loanId={transaction.loan} />
            </div>
        </>
    );
};

export default TransactionForm;
