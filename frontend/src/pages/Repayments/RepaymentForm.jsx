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
        amountPaid: "",
        paymentTerm: "",
        description: ""
    });
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const termOptions = [1, 3, 6, 12]; // months

    useEffect(() => {
        getLoans().then(setLoans);

        if (id) {
            getRepaymentById(id).then((data) => {
                setRepayment({
                    loan: data.loan?._id || "",
                    paymentDate: data.paymentDate ? data.paymentDate.slice(0, 10) : "",
                    amountPaid: data.amountPaid || 0,
                    paymentTerm: data.paymentTerm || "",
                    description: data.description || ""
                });
            });
        }
    }, [id]);

    const handleChange = (e) => setRepayment({ ...repayment, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...repayment,
            amountPaid: Number(repayment.amountPaid),
            paymentTerm: Number(repayment.paymentTerm),
            paymentDate: repayment.paymentDate ? new Date(repayment.paymentDate) : null
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
                    </FormRow>

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

                    <FormRow label="Amount Paid">
                        <input
                            type="number"
                            name="amountPaid"
                            value={repayment.amountPaid}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </FormRow>

                    <FormRow label="Payment Term (months)">
                        <select
                            name="paymentTerm"
                            value={repayment.paymentTerm}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Term</option>
                            {termOptions.map((t) => (
                                <option key={t} value={t}>{t} months</option>
                            ))}
                        </select>
                    </FormRow>

                    <FormRow label="Description">
                        <input
                            type="text"
                            name="description"
                            value={repayment.description}
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
        </>
    );
};

export default RepaymentForm;
