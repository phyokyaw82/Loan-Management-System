import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLoan, getLoanById, updateLoan } from "../../api/loanApi";
import { getBorrowers } from "../../api/borrowerApi";
import PageToolbar from "../../components/PageToolbar";
import FormRow from "../../components/FormRow";

const LoanForm = () => {
    const [loan, setLoan] = useState({
        borrower: "",
        amount: "",
        type: "",
        startDate: "",
        endDate: "",
        interestRate: "",
    });
    const [borrowers, setBorrowers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBorrowers().then(setBorrowers);

        if (id) {
            getLoanById(id).then((data) => {
                setLoan({
                    ...data,
                    startDate: data.startDate ? data.startDate.slice(0, 10) : "",
                    endDate: data.endDate ? data.endDate.slice(0, 10) : "",
                });
            });
        }
    }, [id]);

    const handleChange = (e) => setLoan({ ...loan, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...loan,
            amount: Number(loan.amount),
            interestRate: Number(loan.interestRate),
            startDate: loan.startDate ? new Date(loan.startDate) : null,
            endDate: loan.endDate ? new Date(loan.endDate) : null,
        };

        try {
            if (id) await updateLoan(id, payload);
            else await createLoan(payload);
            navigate("/loans");
        } catch (err) {
            console.error(err);
            alert("Error saving loan");
        }
    };

    return (
        <>
            <PageToolbar title={id ? "Edit Loan" : "Add Loan"} />
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">

                    <FormRow label="Borrower">
                        <select
                            name="borrower"
                            value={loan.borrower}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Borrower</option>
                            {borrowers.map((b) => (
                                <option key={b._id} value={b._id}>
                                    {b.fullName}
                                </option>
                            ))}
                        </select>
                    </FormRow>

                    <FormRow label="Amount">
                        <input
                            type="number"
                            name="amount"
                            value={loan.amount}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="Loan Type">
                        <input
                            type="text"
                            name="type"
                            value={loan.type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="Start Date">
                        <input
                            type="date"
                            name="startDate"
                            value={loan.startDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="End Date">
                        <input
                            type="date"
                            name="endDate"
                            value={loan.endDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="Interest Rate (%)">
                        <input
                            type="number"
                            name="interestRate"
                            value={loan.interestRate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            {id ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoanForm;
