import contractRepository from "./contract.repository.js";
import fs from "fs";

class ContractService {
    async createContract(data) {
        return contractRepository.create(data);
    }

    async updateContract(id, data) {
        const contract = await Contract.findById(id);
        if (!contract) throw new Error("Contract not found");

        contract.loan = data.loan || contract.loan;
        contract.signingDate = data.signingDate || contract.signingDate;

        if (data.documentUrl) contract.documentUrl = data.documentUrl;

        return contract.save(); // returns the updated object
    }

    async getAllContracts() {
        return contractRepository.findAll();
    }

    async getContractById(id) {
        return contractRepository.findById(id);
    }

    async getContractsByLoan(loanId) {
        return contractRepository.findByLoan(loanId);
    }

    async deleteContract(id) {
        const contract = await contractRepository.findById(id);
        if (!contract) return null;

        // Delete file from disk
        if (contract.documentUrl) {
            fs.unlink(contract.documentUrl, (err) => {
                if (err) console.error("Failed to delete contract file", err);
            });
        }

        return contractRepository.delete(id);
    }
}

export default new ContractService();
