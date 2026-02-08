import Contract from "./contract.model.js";

class ContractRepository {
    async create(data) {
        const contract = new Contract(data);
        return contract.save();
    }

    async findAll() {
        return Contract.find().populate({
            path: "loan",
            populate: { path: "borrower" },
        });
    }

    async findById(id) {
        return Contract.findById(id).populate("loan");
    }

    async findByLoan(loanId) {
        return Contract.find({ loan: loanId }).populate({
            path: "loan",
            populate: { path: "borrower" },
        });
    }

    async delete(id) {
        return Contract.findByIdAndDelete(id);
    }
}

export default new ContractRepository();
