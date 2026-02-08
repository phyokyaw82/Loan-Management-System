import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Borrowers from "./pages/Borrowers";
import Loans from "./pages/Loans";
import Repayments from "./pages/Repayments";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="p-6">Home Page</div>} />
        <Route path="/borrowers" element={<Borrowers />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/repayments" element={<Repayments />} />
      </Routes>
    </Router>
  );
}

export default App;
