import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const linkClasses = ({ isActive }) =>
        `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700 font-semibold" : ""}`;

    return (
        <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
            <h1 className="text-xl font-bold mb-6">Loan System</h1>
            <nav className="flex flex-col space-y-3">
                <NavLink to="/" className={linkClasses} end>
                    Home
                </NavLink>
                <NavLink to="/borrowers" className={linkClasses}>
                    Borrowers
                </NavLink>
                <NavLink to="/loans" className={linkClasses}>
                    Loans
                </NavLink>
                <NavLink to="/repayments" className={linkClasses}>
                    Repayments
                </NavLink>
                <NavLink to="/transactions" className={linkClasses}>
                    Transactions
                </NavLink>
                <NavLink to="/contracts" className={linkClasses}>
                    Contracts
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
