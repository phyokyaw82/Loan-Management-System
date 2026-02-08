import Transaction from "./transaction.model.js";

class TransactionRepository {
    async create(data) {
        const transaction = new Transaction(data);
        return transaction.save();
    }

    async findAll() {
        return Transaction.find().populate({
            path: "loan",
            populate: { path: "borrower" }
        });
    }

    async findById(id) {
        return Transaction.findById(id).populate({
            path: "loan",
            populate: { path: "borrower" }
        });
    }

    async findByLoan(loanId) {
        return Transaction.find({ loan: loanId }).populate({
            path: "loan",
            populate: { path: "borrower" }
        });
    }

    async delete(id) {
        return Transaction.findByIdAndDelete(id);
    }
}

export default new TransactionRepository();
