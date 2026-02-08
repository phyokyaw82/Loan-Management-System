import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRepayment, getRepaymentById, updateRepayment } from "../../api/repaymentApi";
import { getLoans } from "../../api/loanApi";
import PageToolbar from "../../components/PageToolbar";
import FormRow from "../../components/FormRow";

const RepaymentForm = () => {
    const [repayment, setRepayment] = useState({
        loan: "",
        paymentDate: "",
        amountPaid: 0,
        paymentTerm: 0,
        description: ""
    });
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const termOptions = [1, 3, 6, 12]; // months

    useEffect(() => {
        const fetchData = async () => {
            const loanData = await getLoans();
            setLoans(loanData);

            if (id) {
                const repaymentData = await getRepaymentById(id);
                setRepayment({
                    loan: repaymentData.loan?._id || "",
                    paymentDate: repaymentData.paymentDate ? repaymentData.paymentDate.slice(0, 10) : "",
                    amountPaid: repaymentData.amountPaid || 0,
                    paymentTerm: repaymentData.paymentTerm || "",
                    description: repaymentData.description || ""
                });
            }
        };

        fetchData();
    }, [id]);

    // Selected loan object
    const selectedLoan = loans.find((l) => l._id === repayment.loan);
    const remainingBalance = selectedLoan?.balance || 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRepayment({
            ...repayment,
            [name]: name === "amountPaid" || name === "paymentTerm" ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const amountPaid = Number(repayment.amountPaid);

        // Validate amountPaid does not exceed remaining balance
        if (amountPaid > remainingBalance) {
            alert(`Amount paid cannot exceed remaining balance: ${remainingBalance}`);
            return;
        }

        const payload = {
            ...repayment,
            amountPaid: amountPaid || 0,
            paymentTerm: Number(repayment.paymentTerm),
            paymentDate: repayment.paymentDate ? new Date(repayment.paymentDate) : new Date()
        };

        try {
            if (id) await updateRepayment(id, payload);
            else await createRepayment(payload);
            navigate("/repayments");
        } catch (err) {
            console.error(err);
            alert("Error saving repayment");
        }
    };

    return (
        <>
            <PageToolbar title={id ? "Edit Repayment" : "Add Repayment"} />
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">

                    {/* Loan Selection */}
                    <FormRow label="Loan">
                        <select
                            name="loan"
                            value={repayment.loan}
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
                        {/* Display remaining balance like TransactionForm */}
                        {selectedLoan && (
                            <p className="text-sm text-gray-600 mt-1">
                                Remaining Balance: {remainingBalance}
                            </p>
                        )}
                    </FormRow>

                    {/* Payment Date */}
                    <FormRow label="Payment Date">
                        <input
                            type="date"
                            name="paymentDate"
                            value={repayment.paymentDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </FormRow>

                    {/* Amount Paid */}
                    <FormRow label="Amount Paid">
                        <input
                            type="number"
                            name="amountPaid"
                            value={repayment.amountPaid}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                            min="0"
                            max={remainingBalance} // optional HTML max
                        />
                    </FormRow>

                    {/* Payment Term */}
                    <FormRow label="Payment Term (months)">
                        <select
                            name="paymentTerm"
                            value={repayment.paymentTerm}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Term</option>
                            {termOptions.map((t) => (
                                <option key={t} value={t}>{t} months</option>
                            ))}
                        </select>
                    </FormRow>

                    {/* Description */}
                    <FormRow label="Description">
                        <input
                            type="text"
                            name="description"
                            value={repayment.description}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    {/* Submit Button */}
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
        </>
    );
};

export default RepaymentForm;
