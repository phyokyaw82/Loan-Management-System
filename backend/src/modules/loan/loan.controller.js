import loanService from "./loan.service.js";

class LoanController {
    async create(req, res) {
        try {
            const loan = await loanService.createLoan(req.body);
            res.status(201).json(loan);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const loans = await loanService.getAllLoans();
            res.json(loans);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const loan = await loanService.getLoanById(req.params.id);
            if (!loan) return res.status(404).json({ error: "Loan not found" });
            res.json(loan);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const loan = await loanService.updateLoan(req.params.id, req.body);
            if (!loan) return res.status(404).json({ error: "Loan not found" });
            res.json(loan);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const loan = await loanService.deleteLoan(req.params.id);
            if (!loan) return res.status(404).json({ error: "Loan not found" });
            res.json({ message: "Loan deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new LoanController();
