import { useEffect, useState } from "react";
import { getLoans, deleteLoan } from "../../api/loanApi";
import PageToolbar from "../../components/PageToolbar";
import DataTable from "../../components/DataTable";
import { Link } from "react-router-dom";

const LoanList = () => {
    const [loans, setLoans] = useState([]);

    const fetchLoans = async () => {
        const data = await getLoans();
        setLoans(data);
    };

    const handleDelete = async (loan) => {
        if (window.confirm(`Are you sure you want to delete this loan for ${loan.borrower?.fullName || loan.borrower}?`)) {
            await deleteLoan(loan._id);
            fetchLoans();
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    // Columns configuration
    const columns = [
        {
            key: "borrower",
            label: "Borrower",
            render: (l) => l.borrower?.fullName || l.borrower,
        },
        { key: "amount", label: "Amount" },
        { key: "type", label: "Type" },
        {
            key: "interestRate",
            label: "Interest Rate",
            render: (l) => `${l.interestRate}%`,
        },
        { key: "balance", label: "Balance" },
    ];

    // Actions configuration
    const actions = [
        {
            type: "link",
            label: "Edit",
            to: (l) => `/loans/edit/${l._id}`,
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
            <PageToolbar title="Loans" buttonLabel="Add Loan" buttonLink="/loans/new" />
            <DataTable columns={columns} data={loans} actions={actions} />
        </>
    );
};

export default LoanList;
