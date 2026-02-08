import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContract, getContractById, updateContract } from "../../api/contractApi";
import { getLoans } from "../../api/loanApi";
import FileUpload from "../../components/FileUpload";
import PageToolbar from "../../components/PageToolbar";

const ContractForm = () => {
    const [contract, setContract] = useState({
        loan: "",
        document: null, // File to upload
        documentUrl: "", // Existing file URL
        signingDate: "",
    });
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getLoans().then(setLoans);

        if (id) {
            getContractById(id).then((data) => {
                setContract({
                    loan: data.loan?._id || "",
                    document: null, // Cannot prefill file input
                    documentUrl: data.documentUrl || "",
                    signingDate: data.signingDate ? data.signingDate.slice(0, 10) : "",
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContract({ ...contract, [name]: value });
    };

    const handleFileSelect = (file) => {
        setContract({ ...contract, document: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("loan", contract.loan);
        formData.append("signingDate", contract.signingDate);

        // Append file only if selected
        if (contract.document) formData.append("document", contract.document);

        try {
            if (id) await updateContract(id, formData);
            else await createContract(formData);
            navigate("/contracts");
        } catch (err) {
            console.error(err);
            alert("Error saving contract");
        }
    };

    return (
        <>
            <PageToolbar title={id ? "Edit Contract" : "Add Contract"} />
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
                    {/* Loan */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Loan</label>
                        <select
                            name="loan"
                            value={contract.loan}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        >
                            <option value="">Select Loan</option>
                            {loans.map((l) => (
                                <option key={l._id} value={l._id}>
                                    {l.borrower?.fullName}-{l.amount}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Signing Date */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Signing Date</label>
                        <input
                            type="date"
                            name="signingDate"
                            value={contract.signingDate}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    {/* File Upload */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Contract Document</label>
                        <FileUpload
                            onFileSelect={handleFileSelect}
                            existingFileUrl={contract.documentUrl}
                        />
                    </div>
      
                    {/* Submit */}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            {id ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContractForm;
