import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBorrower, getBorrowerById, updateBorrower } from "../../api/borrowerApi";
import PageToolbar from "../../components/PageToolbar";
import FormRow from "../../components/FormRow";

const BorrowerForm = () => {
    const [borrower, setBorrower] = useState({ fullName: "", phone: "", email: "", address: "", nrc: "" });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getBorrowerById(id).then(setBorrower);
        }
    }, [id]);

    const handleChange = (e) => setBorrower({ ...borrower, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) await updateBorrower(id, borrower);
        else await createBorrower(borrower);
        navigate("/borrowers");
    };

    return (
        <>
            <PageToolbar title={id ? "Edit Borrower" : "Add Borrower"} />
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">

                    <FormRow label="Full Name">
                        <input
                            type="text"
                            name="fullName"
                            value={borrower.fullName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="Phone">
                        <input
                            type="text"
                            name="phone"
                            value={borrower.phone}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="Email">
                        <input
                            type="email"
                            name="email"
                            value={borrower.email}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="Address">
                        <input
                            type="text"
                            name="address"
                            value={borrower.address}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </FormRow>

                    <FormRow label="ID Number">
                        <input
                            type="text"
                            name="nrc"
                            value={borrower.nrc}
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

export default BorrowerForm;
