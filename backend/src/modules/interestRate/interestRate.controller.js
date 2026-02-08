import interestRateService from "./interestRate.service.js";

class InterestRateController {
    async create(req, res) {
        try {
            const rate = await interestRateService.createRate(req.body);
            res.status(201).json(rate);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const rates = await interestRateService.getAllRates();
            res.json(rates);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const rate = await interestRateService.getRateById(req.params.id);
            if (!rate) return res.status(404).json({ error: "Not found" });
            res.json(rate);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const rate = await interestRateService.updateRate(req.params.id, req.body);
            if (!rate) return res.status(404).json({ error: "Not found" });
            res.json(rate);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const rate = await interestRateService.deleteRate(req.params.id);
            if (!rate) return res.status(404).json({ error: "Not found" });
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new InterestRateController();
