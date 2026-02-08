import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLoan, getLoanById, updateLoan } from "../../api/loanApi";
import { getBorrowers } from "../../api/borrowerApi";
import PageToolbar from "../../components/PageToolbar";
import FormRow from "../../components/FormRow";
import { getInterestRates } from "../../api/interestRateApi";

const LoanForm = () => {
    const [loan, setLoan] = useState({
        borrower: "",
        amount: 0,
        type: "",
        startDate: "",
        endDate: "",
        interestRate: 5,
    });
    const [borrowers, setBorrowers] = useState([]);
    const [interestRates, setInterestRates] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchInterestRates = async () => {
            const rates = await getInterestRates();
            setInterestRates(rates);
        };

        fetchInterestRates();
    }, []);

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
                        <select name="borrower"
                            value={loan.borrower._id}
                            onChange={handleChange}
                            className="w-full border p-2 rounded">
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
                            required
                        />
                    </FormRow>

                    <FormRow label="Loan Type">
                        <select
                            name="type"
                            value={loan.type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Loan Type</option>
                            <option value="Personal">Personal</option>
                            <option value="Mortgage">Mortgage</option>
                        </select>
                    </FormRow>

                    <FormRow label="Start Date">
                        <input
                            type="date"
                            name="startDate"
                            value={loan.startDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </FormRow>

                    <FormRow label="End Date">
                        <input
                            type="date"
                            name="endDate"
                            value={loan.endDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </FormRow>

                    <FormRow label="Interest Rate (%)">
                        <select
                            name="interestRate"
                            value={loan.interestRate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Rate</option>
                            {interestRates.map((r) => (
                                <option key={r.rate} value={r.rate}>
                                    {r.rate}%
                                </option>
                            ))}
                        </select>
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
            </div >
        </>
    );
};

export default LoanForm;
