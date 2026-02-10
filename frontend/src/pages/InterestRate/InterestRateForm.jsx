import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createInterestRate, updateInterestRate, getInterestRateById } from "../../api/interestRateApi";
import PageToolbar from "../../components/PageToolbar";
import FormRow from "../../components/FormRow";

const InterestRateForm = () => {
    const [interestRate, setInterestRate] = useState({ rate: 0 });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getInterestRateById(id).then(setInterestRate);
        }
    }, [id]);

    const handleChange = (e) => setInterestRate({ ...interestRate, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) await updateInterestRate(id, interestRate);
        else await createInterestRate(interestRate);
        navigate("/interestRates");
    };

    return (
        <>
            <PageToolbar title={id ? "Edit Interest Rate" : "Add Interest Rate"} />
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">

                    <FormRow label="Interest Rate">
                        <input
                            type="number"
                            name="rate"
                            value={interestRate.rate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
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

export default InterestRateForm;
