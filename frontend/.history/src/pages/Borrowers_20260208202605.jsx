import { useState, useEffect } from "react";
import api from "../api/axios";

const Borrowers = () => {
    const [borrowers, setBorrowers] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // Fetch borrowers from backend
    useEffect(() => {
        fetchBorrowers();
    }, []);

    const fetchBorrowers = async () => {
        try {
            const res = await api.get("/borrowers");
            setBorrowers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addBorrower = async (e) => {
        e.preventDefault();
        try {
            await api.post("/borrowers", { fullName: name, phone });
            setName("");
            setPhone("");
            fetchBorrowers();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Borrowers</h2>

            <form onSubmit={addBorrower} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 rounded">
                    Add
                </button>
            </form>

            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowers.map((b) => (
                        <tr key={b._id}>
                            <td className="border px-2 py-1">{b.fullName}</td>
                            <td className="border px-2 py-1">{b.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Borrowers;
