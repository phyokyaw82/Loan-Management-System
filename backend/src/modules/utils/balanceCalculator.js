import Loan from "../loan/loan.model.js";
import Transaction from "../transaction/transaction.model.js";
import Repayment from "../repayment/repayment.model.js";

/**
 * Compute current balance for a loan
 * @param {string} loanId - Loan ObjectId
 * @returns {number} remaining balance
 */
export async function computeLoanBalance(loanId) {
    const loan = await Loan.findById(loanId);
    if (!loan) throw new Error("Loan not found");

    let balance = loan.amount + (loan.amount * loan.interestRate) / 100;

    const transactions = await Transaction.find({ loan: loanId });
    const repayments = await Repayment.find({ loan: loanId });

    transactions.forEach(tx => {
        if (tx.type === "Late Fee" || tx.type === "Penalty") balance += tx.amount;
        if (tx.type === "Repayment") balance -= tx.amount;
    });

    repayments.forEach(rp => {
        balance -= rp.amountPaid || 0;
    });

    // Fix floating-point precision
    return Number(balance.toFixed(2));
}
