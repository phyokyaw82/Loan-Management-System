import { useState, useEffect } from "react";
import api from "../api/axios";

const Repayments = () => {
    const [repayments, setRepayments] = useState([]);
    const [loanId, setLoanId] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        fetchRepayments();
    }, []);

    const fetchRepayments = async () => {
        try {
            const res = await api.get("/repayments");
            setRepayments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addRepayment = async (e) => {
        e.preventDefault();
        try {
            await api.post("/repayments", { loan: loanId, amount });
            setLoanId("");
            setAmount("");
            fetchRepayments();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Repayments</h2>

            <form onSubmit={addRepayment} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Loan ID"
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Amount Paid"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-purple-600 text-white px-4 rounded">
                    Add Repayment
                </button>
            </form>

            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Payment ID</th>
                        <th className="border px-2 py-1">Loan ID</th>
                        <th className="border px-2 py-1">Amount Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {repayments.map((r) => (
                        <tr key={r._id}>
                            <td className="border px-2 py-1">{r._id}</td>
                            <td className="border px-2 py-1">{r.loan}</td>
                            <td className="border px-2 py-1">{r.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Repayments;
