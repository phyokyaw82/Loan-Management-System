import repaymentRepository from "./repayment.repository.js";
import { computeLoanBalance } from "../utils/balanceCalculator.js";

class RepaymentService {
    async createRepayment(data) {
        const repayment = await repaymentRepository.create(data);
        repayment.remainingBalance = await computeLoanBalance(repayment.loan);
        await repayment.save();
        return repayment;
    }

    async updatePayment(id, data) {
        const repayment = await repaymentRepository.findById(id);
        if (!repayment) throw new Error("Repayment not found");

        Object.assign(repayment, data);
        repayment.remainingBalance = await computeLoanBalance(repayment.loan);
        return repayment.save();
    }

    async getAllRepayments() {
        return repaymentRepository.findAll();
    }

    async getRepaymentsByLoan(loanId) {
        return repaymentRepository.findByLoan(loanId);
    }

    async getRepaymentById(id) {
        return repaymentRepository.findById(id);
    }

    async deleteRepayment(id) {
        return repaymentRepository.delete(id);
    }
}

export default new RepaymentService();
