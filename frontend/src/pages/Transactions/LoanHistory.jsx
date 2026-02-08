import { useEffect, useState } from "react";
import { getRepaymentsByLoan } from "../../api/repaymentApi";
import { getTransactionsByLoan } from "../../api/transactionApi";
import DataTable from "../../components/DataTable";

const LoanHistory = ({ loanId }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!loanId) return;

        const fetchHistory = async () => {
            const repayments = await getRepaymentsByLoan(loanId);
            const transactions = await getTransactionsByLoan(loanId);

            const combined = [
                ...repayments.map((r) => ({
                    _id: r._id,
                    type: "Repayment",
                    date: r.paymentDate,
                    amount: r.amountPaid,
                    description: r.description || "-",
                })),
                ...transactions.map((t) => ({
                    _id: t._id,
                    type: t.type,
                    date: t.transactionDate,
                    amount: t.amount,
                    description: t.description || "-",
                })),
            ];

            combined.sort((a, b) => new Date(b.date) - new Date(a.date));
            setHistory(combined);
        };

        fetchHistory();
    }, [loanId]);

    if (!loanId) return null;

    const columns = [
        { label: "Date", key: "date", render: (row) => new Date(row.date).toLocaleDateString() },
        { label: "Type", key: "type" },
        { label: "Amount", key: "amount" },
        { label: "Description", key: "description" },
    ];

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Loan History</h2>
            <DataTable columns={columns} data={history} />
        </div>
    );
};

export default LoanHistory;
