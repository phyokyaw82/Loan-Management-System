import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BorrowerList from "./pages/Borrowers/BorrowerList";
import BorrowerForm from "./pages/Borrowers/BorrowerForm";
import LoanList from "./pages/Loans/LoanList";
import LoanForm from "./pages/Loans/LoanForm";
import RepaymentList from "./pages/Repayments/RepaymentList";
import RepaymentForm from "./pages/Repayments/RepaymentForm";
import TransactionList from "./pages/Transactions/TransactionList";
import TransactionForm from "./pages/Transactions/TransactionForm";
import ContractList from "./pages/Contracts/ContractList";
import ContractForm from "./pages/Contracts/ContractForm";
import InterestRateList from "./pages/InterestRate/InterestRateList";
import InterestRateForm from "./pages/InterestRate/InterestRateForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/borrowers" element={<BorrowerList />} />
          <Route path="/borrowers/new" element={<BorrowerForm />} />
          <Route path="/borrowers/edit/:id" element={<BorrowerForm />} />

          <Route path="/loans" element={<LoanList />} />
          <Route path="/loans/new" element={<LoanForm />} />
          <Route path="/loans/edit/:id" element={<LoanForm />} />

          <Route path="/repayments" element={<RepaymentList />} />
          <Route path="/repayments/new" element={<RepaymentForm />} />
          <Route path="/repayments/edit/:id" element={<RepaymentForm />} />

          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transactions/new" element={<TransactionForm />} />
          <Route path="/transactions/edit/:id" element={<TransactionForm />} />

          <Route path="/contracts" element={<ContractList />} />
          <Route path="/contracts/new" element={<ContractForm />} />
          <Route path="/contracts/edit/:id" element={<ContractForm />} />

          <Route path="/interestRates" element={<InterestRateList />} />
          <Route path="/interestRates/new" element={<InterestRateForm />} />
          <Route path="/interestRates/edit/:id" element={<InterestRateForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
