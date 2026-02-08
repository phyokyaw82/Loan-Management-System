import Borrower from "./borrower.model.js";

class BorrowerRepository {
    async create(data) {
        const borrower = new Borrower(data);
        return borrower.save();
    }

    async findAll() {
        return Borrower.find();
    }

    async findById(id) {
        return Borrower.findById(id);
    }

    async update(id, data) {
        return Borrower.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Borrower.findByIdAndDelete(id);
    }
}

export default new BorrowerRepository();
