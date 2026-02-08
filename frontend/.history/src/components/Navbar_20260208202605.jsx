import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/borrowers">Borrowers</Link>
        <Link to="/loans">Loans</Link>
        <Link to="/repayments">Repayments</Link>
    </nav>
);

export default Navbar;
