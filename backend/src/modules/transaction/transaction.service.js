import transactionRepository from "./transaction.repository.js";

class TransactionService {
    async createTransaction(data) {
        // Validate loan exists
        const transaction = await transactionRepository.create(data);
        return transaction;
    }

    async updateTransaction(id, data) {
        const transaction = await transactionRepository.findById(id);
        if (!transaction) throw new Error("Transaction not found");

        Object.assign(transaction, data);
        return transaction.save();
    }

    getAllTransactions() {
        return transactionRepository.findAll();
    }

    getTransactionById(id) {
        return transactionRepository.findById(id);
    }

    getTransactionsByLoan(loanId) {
        return transactionRepository.findByLoan(loanId);
    }

    deleteTransaction(id) {
        return transactionRepository.delete(id);
    }
}

export default new TransactionService();
