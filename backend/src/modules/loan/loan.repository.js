import Loan from "./loan.model.js";

class LoanRepository {
    async create(data) {
        const loan = new Loan(data);
        return loan.save();
    }

    async findAll() {
        return Loan.find().populate("borrower");
    }

    async findById(id) {
        return Loan.findById(id).populate("borrower");
    }

    async update(id, data) {
        return Loan.findByIdAndUpdate(id, data, { new: true }).populate("borrower");
    }

    async delete(id) {
        return Loan.findByIdAndDelete(id);
    }
}

export default new LoanRepository();
