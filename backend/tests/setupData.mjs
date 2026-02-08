import Borrower from "../src/modules/borrower/borrower.model.js";
import Loan from "../src/modules/loan/loan.model.js";
import InterestRate from "../src/modules/interestRate/interestRate.model.js";

// --- Borrower helper ---
export const createTestBorrower = async () => {
    const borrower = await Borrower.create({
        fullName: "John Doe",
        phone: "0912345678",
        email: `john${Date.now()}@example.com`, // unique email
        address: "Yangon, Myanmar",
        nrc: `12/KaMaNa${Date.now()}`,
    });
    return borrower;
};

// --- Loan helper ---
export const createTestLoan = async (borrowerId) => {
    const loan = await Loan.create({
        amount: 5000,
        interestRate: 5,
        type: "Personal",
        borrower: borrowerId,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    return loan;
};

// --- Interest Rate helper ---
export const createTestInterestRate = async (rate = 5) => {
    const interestRate = await InterestRate.create({
        rate, // default 5%
    });
    return interestRate;
};
