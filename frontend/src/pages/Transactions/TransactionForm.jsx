import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTransaction, getTransactionById, updateTransaction } from "../../api/transactionApi";
import { getLoans } from "../../api/loanApi";
import LoanHistory from "./LoanHistory";
import PageToolbar from "../../components/PageToolbar";
import FormRow from "../../components/FormRow"; // <-- import shared FormRow

const TransactionForm = () => {
    const [transaction, setTransaction] = useState({
        loan: "",
        type: "",
        amount: "",
        description: "",
        transactionDate: ""
    });

    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const typeOptions = ["Repayment", "Late Fee", "Penalty"];

    useEffect(() => {
        getLoans().then(setLoans);

        if (id) {
            getTransactionById(id).then((data) => {
                setTransaction({
                    loan: data.loan?._id || "",
                    type: data.type || "",
                    amount: data.amount || "",
                    description: data.description || "",
                    transactionDate: data.transactionDate ? data.transactionDate.slice(0, 10) : ""
                });
            });
        }
    }, [id]);

    const handleChange = (e) => setTransaction({ ...transaction, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...transaction,
            amount: Number(transaction.amount),
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
                    <FormRow label="Loan">
                        <select
                            name="loan"
                            value={transaction.loan}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Loan</option>
                            {loans.map((l) => (
                                <option key={l._id} value={l._id}>
                                    {l.borrower?.fullName ? `${l.borrower.fullName}-${l.amount}` : `Unknown-${l.amount}`}
                                </option>
                            ))}
                        </select>
                    </FormRow>

                    <FormRow label="Type">
                        <select
                            name="type"
                            value={transaction.type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Type</option>
                            {typeOptions.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </FormRow>

                    <FormRow label="Amount">
                        <input
                            type="number"
                            name="amount"
                            value={transaction.amount}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="Description">
                        <input
                            type="text"
                            name="description"
                            value={transaction.description}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="Transaction Date">
                        <input
                            type="date"
                            name="transactionDate"
                            value={transaction.transactionDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

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
