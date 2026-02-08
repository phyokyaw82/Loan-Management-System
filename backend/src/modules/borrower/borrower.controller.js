import borrowerService from "./borrower.service.js";

class BorrowerController {
    async create(req, res) {
        try {
            const borrower = await borrowerService.createBorrower(req.body);
            res.status(201).json(borrower);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const borrowers = await borrowerService.getAllBorrowers();
            res.json(borrowers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const borrower = await borrowerService.getBorrowerById(req.params.id);
            if (!borrower) return res.status(404).json({ error: "Not found" });
            res.json(borrower);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const borrower = await borrowerService.updateBorrower(req.params.id, req.body);
            if (!borrower) return res.status(404).json({ error: "Not found" });
            res.json(borrower);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const borrower = await borrowerService.deleteBorrower(req.params.id);
            if (!borrower) return res.status(404).json({ error: "Not found" });
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new BorrowerController();
