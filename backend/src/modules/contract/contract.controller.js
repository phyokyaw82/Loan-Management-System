import contractService from "./contract.service.js";
import fs from "fs";
import path from "path";

class ContractController {
    // Create/upload new contract
    async upload(req, res) {
        try {
            if (!req.file) return res.status(400).json({ error: "No file uploaded" });

            const documentPath = req.file.path.startsWith("/")
                ? req.file.path.slice(1)
                : req.file.path;

            const data = {
                loan: req.body.loan,
                signingDate: req.body.signingDate,
                documentUrl: documentPath,
            };

            const contract = await contractService.createContract(data);
            res.status(201).json(contract);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const contracts = await contractService.getAllContracts();
            res.json(contracts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const contract = await contractService.getContractById(req.params.id);
            if (!contract) return res.status(404).json({ error: "Not found" });
            res.json(contract);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getByLoan(req, res) {
        try {
            const contracts = await contractService.getContractsByLoan(req.params.loanId);
            res.json(contracts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Update existing contract
    async update(req, res) {
        try {
            const contractId = req.params.id;
            const contract = await contractService.getContractById(contractId);
            if (!contract) return res.status(404).json({ error: "Contract not found" });

            // Update fields
            if (req.body.loan) contract.loan = req.body.loan;
            if (req.body.signingDate) contract.signingDate = req.body.signingDate;

            // Replace document if new file uploaded
            if (req.file) {
                let documentPath = req.file.path;
                if (documentPath.startsWith("/")) documentPath = documentPath.slice(1);
                contract.documentUrl = documentPath;
            }

            await contract.save();
            res.json(contract); // Return updated contract with the new documentUrl
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const contract = await contractService.getContractById(req.params.id);
            if (!contract) return res.status(404).json({ error: "Not found" });

            if (contract.documentUrl) {
                // Normalize path (VERY IMPORTANT)
                const normalizedPath = contract.documentUrl.replace(/\\/g, "/");
                const filePath = path.resolve(process.cwd(), normalizedPath);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await contractService.deleteContract(req.params.id);
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new ContractController();
