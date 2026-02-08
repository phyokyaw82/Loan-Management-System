import { useEffect, useState } from "react";
import { getBorrowers, deleteBorrower } from "../../api/borrowerApi";
import PageToolbar from "../../components/PageToolbar";
import DataTable from "../../components/DataTable";
import { Link } from "react-router-dom";

const BorrowerList = () => {
    const [borrowers, setBorrowers] = useState([]);

    const fetchBorrowers = async () => {
        const data = await getBorrowers();
        setBorrowers(data);
    };

    const handleDelete = async (borrower) => {
        if (window.confirm(`Are you sure you want to delete ${borrower.fullName}?`)) {
            await deleteBorrower(borrower._id);
            fetchBorrowers();
        }
    };

    useEffect(() => {
        fetchBorrowers();
    }, []);

    // Define columns
    const columns = [
        { key: "fullName", label: "Full Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
    ];

    // Define actions
    const actions = [
        {
            type: "link",
            label: "Edit",
            to: (b) => `/borrowers/edit/${b._id}`,
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
            <PageToolbar
                title="Borrowers"
                buttonLabel="Add Borrower"
                buttonLink="/borrowers/new"
            />

            <DataTable columns={columns} data={borrowers} actions={actions} />
        </>
    );
};

export default BorrowerList;
