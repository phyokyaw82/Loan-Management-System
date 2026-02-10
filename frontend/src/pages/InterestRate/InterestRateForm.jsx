import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createInterestRate,
    updateInterestRate,
    getInterestRateById,
    getInterestRates   // 👈 get all rates
} from "../../api/interestRateApi";
import PageToolbar from "../../components/PageToolbar";
import FormRow from "../../components/FormRow";

const InterestRateForm = () => {
    const [interestRate, setInterestRate] = useState({ rate: "" });
    const [allRates, setAllRates] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    // 🔹 load all rates (ONCE)
    useEffect(() => {
        getInterestRates().then(setAllRates);
    }, []);

    // 🔹 load edit data
    useEffect(() => {
        if (id) {
            getInterestRateById(id).then(setInterestRate);
        }
    }, [id]);

    const handleChange = (e) => {
        setInterestRate({ rate: e.target.value });
        setError("");
    };

    // 🔥 FRONTEND UNIQUE CHECK
    const isDuplicateRate = () => {
        return allRates.some(r =>
            Number(r.rate) === Number(interestRate.rate) &&
            r._id !== id // exclude self when editing
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isDuplicateRate()) {
            setError("This interest rate already exists.");
            return; // ❌ block submit
        }

        if (id) {
            await updateInterestRate(id, interestRate);
        } else {
            await createInterestRate(interestRate);
        }

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
                            className={`w-full border p-2 rounded ${error ? "border-red-500" : ""
                                }`}
                            required
                        />

                        {error && (
                            <p className="text-sm text-red-500 mt-1">
                                {error}
                            </p>
                        )}
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
