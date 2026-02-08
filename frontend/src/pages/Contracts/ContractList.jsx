import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContracts, deleteContract } from "../../api/contractApi";
import PageToolbar from "../../components/PageToolbar";
import DataTable from "../../components/DataTable";

const ContractList = () => {
    const [contracts, setContracts] = useState([]);

    const fetchContracts = async () => {
        const data = await getContracts();
        setContracts(data);
    };

    const handleDelete = async (contract) => {
        if (!window.confirm("Are you sure you want to delete this contract?")) return;
        await deleteContract(contract._id);
        fetchContracts();
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    // Columns configuration
    const columns = [
        {
            key: "borrowerLoan",
            label: "Borrower",
            render: (c) => `${c.loan?.borrower?.fullName || "Unknown"}-${c.loan?.amount || 0}`,
        },
        {
            key: "signingDate",
            label: "Signing Date",
            render: (c) => c.signingDate ? new Date(c.signingDate).toLocaleDateString() : "-",
        },
        {
            key: "document",
            label: "Document",
            render: (c) =>
                c.documentUrl ? (
                    <a
                        href={`http://localhost:5000/${c.documentUrl.replace("\\", "/")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        Download
                    </a>
                ) : (
                    "No file"
                ),
        },
    ];

    // Actions configuration
    const actions = [
        {
            type: "link",
            label: "Edit",
            to: (c) => `/contracts/edit/${c._id}`,
            className: "text-blue-500",
        },
        {
            type: "button",
            label: "Delete",
            onClick: handleDelete,
            className: "text-red-500",
        },
    ];

    return (
        <>
            <PageToolbar title="Contracts" buttonLabel="Add Contract" buttonLink="/contracts/new" />
            <DataTable columns={columns} data={contracts} actions={actions} />
        </>
    );
};

export default ContractList;
