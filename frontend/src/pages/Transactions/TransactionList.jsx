import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../../api/transactionApi";
import { getLoans } from "../../api/loanApi";
import PageToolbar from "../../components/PageToolbar";
import DataTable from "../../components/DataTable";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loans, setLoans] = useState({}); // loanId => loan object

    const fetchTransactions = async () => {
        const data = await getTransactions();
        setTransactions(data);
    };

    const fetchLoans = async () => {
        const loanList = await getLoans();
        const loanMap = {};
        loanList.forEach((l) => (loanMap[l._id] = l));
        setLoans(loanMap);
    };

    useEffect(() => {
        fetchTransactions();
        fetchLoans();
    }, []);

    const handleDelete = async (transaction) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            await deleteTransaction(transaction._id);
            fetchTransactions();
        }
    };

    // Columns configuration
    const columns = [
        {
            key: "borrower",
            label: "Borrower",
            render: (t) => {
                const loan = loans[t.loan?._id || t.loan];
                return loan?.borrower?.fullName
                    ? `${loan.borrower.fullName}-${loan.amount}`
                    : "Unknown";
            },
        },
        {
            key: "transactionDate",
            label: "Transaction Date",
            render: (t) => (t.transactionDate ? t.transactionDate.slice(0, 10) : "-"),
        },
        { key: "type", label: "Type" },
        { key: "amount", label: "Amount" },
        { key: "description", label: "Description", render: (t) => t.description || "-" },
    ];

    // Actions configuration
    const actions = [
        // {
        //     type: "link",
        //     label: "Edit",
        //     to: (t) => `/transactions/edit/${t._id}`,
        //     className: "text-blue-500",
        // },
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
                title="Transactions"
                buttonLabel="Add Transaction"
                buttonLink="/transactions/new"
            />
            <DataTable columns={columns} data={transactions} actions={actions} />
        </>
    );
};

export default TransactionList;
