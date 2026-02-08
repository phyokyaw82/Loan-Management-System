import transactionService from "./transaction.service.js";

class TransactionController {
    async create(req, res) {
        try {
            const transaction = await transactionService.createTransaction(req.body);
            res.status(201).json(transaction);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const transaction = await transactionService.updateTransaction(req.params.id, req.body);
            if (!transaction) return res.status(404).json({ error: "Transaction not found" });
            res.json(transaction);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const transactions = await transactionService.getAllTransactions();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const transaction = await transactionService.getTransactionById(req.params.id);
            if (!transaction) return res.status(404).json({ error: "Transaction not found" });
            res.json(transaction);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getByLoan(req, res) {
        try {
            const transactions = await transactionService.getTransactionsByLoan(req.params.loanId);
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const transaction = await transactionService.deleteTransaction(req.params.id);
            if (!transaction) return res.status(404).json({ error: "Transaction not found" });
            res.json({ message: "Transaction deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new TransactionController();
