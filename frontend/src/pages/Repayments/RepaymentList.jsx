import { useEffect, useState } from "react";
import { getRepayments, deleteRepayment } from "../../api/repaymentApi";
import { getLoans } from "../../api/loanApi";
import PageToolbar from "../../components/PageToolbar";
import DataTable from "../../components/DataTable";

const RepaymentList = () => {
    const [repayments, setRepayments] = useState([]);
    const [loans, setLoans] = useState({});

    const fetchRepayments = async () => {
        const data = await getRepayments();
        setRepayments(data);
    };

    const fetchLoans = async () => {
        const loanList = await getLoans();
        const loanMap = {};
        loanList.forEach((l) => (loanMap[l._id] = l));
        setLoans(loanMap);
    };

    const handleDelete = async (repayment) => {
        if (window.confirm("Are you sure you want to delete this repayment?")) {
            await deleteRepayment(repayment._id);
            fetchRepayments();
        }
    };

    useEffect(() => {
        fetchRepayments();
        fetchLoans();
    }, []);

    const columns = [
        {
            key: "borrower",
            label: "Borrower",
            render: (r) => {
                const loan = loans[r.loan?._id || r.loan];
                return loan?.borrower?.fullName
                    ? `${loan.borrower.fullName} - ${loan.amount}`
                    : "Unknown";
            },
        },
        {
            key: "paymentDate",
            label: "Payment Date",
            render: (r) => (r.paymentDate ? r.paymentDate.slice(0, 10) : ""),
        },
        { key: "amountPaid", label: "Amount Paid" },
        { key: "paymentTerm", label: "Payment Term", render: (r) => `${r.paymentTerm} months` },
        { key: "remainingBalance", label: "Remaining Balance", render: (r) => `${r.remainingBalance}` },
        { key: "description", label: "Description", render: (r) => r.description || "-" },
    ];

    const actions = [
        {
            type: "link",
            label: "Edit",
            to: (r) => `/repayments/edit/${r._id}`,
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
            <PageToolbar title="Repayments" buttonLabel="Add Repayment" buttonLink="/repayments/new" />
            <DataTable columns={columns} data={repayments} actions={actions} />
        </>
    );
};

export default RepaymentList;
