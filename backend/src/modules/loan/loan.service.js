// import Loan from "./loan.model.js";
// import Transaction from "../transaction/transaction.model.js";
// import Repayment from "../repayment/repayment.model.js";

// class LoanService {
//     async createLoan(data) {
//         return Loan.create(data);
//     }

//     // ✅ Fetch all loans with calculated balance
//     async getAllLoans() {
//         const loans = await Loan.find().populate("borrower");

//         const loansWithBalance = await Promise.all(
//             loans.map(async (loan) => {
//                 const transactions = await Transaction.find({ loan: loan._id });
//                 const repayments = await Repayment.find({ loan: loan._id });

//                 let balance = loan.amount + (loan.amount * loan.interestRate) / 100;

//                 transactions.forEach(tx => {
//                     if (tx.type === "Late Fee" || tx.type === "Penalty") balance += tx.amount;
//                     if (tx.type === "Repayment") balance -= tx.amount;
//                 });

//                 repayments.forEach(rp => {
//                     balance -= rp.amountPaid || 0;
//                 });

//                 return { ...loan.toObject(), balance };
//             })
//         );

//         return loansWithBalance;
//     }

//     // ✅ Fetch single loan with calculated balance
//     async getLoanById(id) {
//         const loan = await Loan.findById(id).populate("borrower");
//         if (!loan) return null;

//         const transactions = await Transaction.find({ loan: loan._id });
//         const repayments = await Repayment.find({ loan: loan._id });

//         let balance = loan.amount + (loan.amount * loan.interestRate) / 100;

//         transactions.forEach(tx => {
//             if (tx.type === "Late Fee" || tx.type === "Penalty") balance += tx.amount;
//             if (tx.type === "Repayment") balance -= tx.amount;
//         });

//         repayments.forEach(rp => {
//             balance -= rp.amountPaid || 0;
//         });

//         return { ...loan.toObject(), balance };
//     }

//     async updateLoan(id, data) {
//         return Loan.findByIdAndUpdate(id, data, { new: true }).populate("borrower");
//     }

//     async deleteLoan(id) {
//         return Loan.findByIdAndDelete(id);
//     }
// }

// export default new LoanService();

import Loan from "./loan.model.js";
import { computeLoanBalance } from "../utils/balanceCalculator.js";

class LoanService {
    async createLoan(data) {
        return Loan.create(data);
    }

    async getAllLoans() {
        const loans = await Loan.find().populate("borrower");
        const loansWithBalance = await Promise.all(
            loans.map(async loan => {
                const balance = await computeLoanBalance(loan._id);
                return { ...loan.toObject(), balance };
            })
        );
        return loansWithBalance;
    }

    async getLoanById(id) {
        const loan = await Loan.findById(id).populate("borrower");
        if (!loan) return null;

        const balance = await computeLoanBalance(loan._id);
        return { ...loan.toObject(), balance };
    }

    async updateLoan(id, data) {
        return Loan.findByIdAndUpdate(id, data, { new: true }).populate("borrower");
    }

    async deleteLoan(id) {
        return Loan.findByIdAndDelete(id);
    }
}

export default new LoanService();

