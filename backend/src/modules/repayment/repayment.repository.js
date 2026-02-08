import Repayment from "./repayment.model.js";

class RepaymentRepository {
    async create(data) {
        const repayment = new Repayment(data);
        return repayment.save();
    }

    async findAll() {
        return Repayment.find().populate({
            path: "loan",
            populate: { path: "borrower" },
        });
    }

    async findById(id) {
        return Repayment.findById(id).populate({
            path: "loan",
            populate: { path: "borrower" },
        });
    }

    async findByLoan(loanId) {
        return Repayment.find({ loan: loanId })
            .sort({ paymentDate: 1 })
            .populate({ path: "loan", populate: { path: "borrower" } });
    }

    async delete(id) {
        return Repayment.findByIdAndDelete(id);
    }
}

export default new RepaymentRepository();
