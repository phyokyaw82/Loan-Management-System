import repaymentService from "./repayment.service.js";

class RepaymentController {
    async create(req, res) {
        try {
            const repayment = await repaymentService.createRepayment(req.body);
            res.status(201).json(repayment);
        } catch (err) {
            console.error("Create repayment error:", err);
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const repayment = await repaymentService.updatePayment(req.params.id, req.body);
            if (!repayment) return res.status(404).json({ error: "Repayment not found" });
            res.json(repayment);
        } catch (err) {
            console.error("Update repayment error:", err);
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const repayments = await repaymentService.getAllRepayments();
            res.json(repayments);
        } catch (err) {
            console.error("Get all repayments error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const repayment = await repaymentService.getRepaymentById(req.params.id);
            if (!repayment) return res.status(404).json({ error: "Not found" });
            res.json(repayment);
        } catch (err) {
            console.error("Get repayment by ID error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    async getByLoan(req, res) {
        try {
            const repayments = await repaymentService.getRepaymentsByLoan(req.params.loanId);
            res.json(repayments);
        } catch (err) {
            console.error("Get repayments by loan error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const repayment = await repaymentService.deleteRepayment(req.params.id);
            if (!repayment) return res.status(404).json({ error: "Not found" });
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            console.error("Delete repayment error:", err);
            res.status(500).json({ error: err.message });
        }
    }
}

export default new RepaymentController();
