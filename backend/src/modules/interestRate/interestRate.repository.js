import InterestRate from "./interestRate.model.js";

class InterestRateRepository {
    async create(data) {
        const interestRate = new InterestRate(data);
        return interestRate.save();
    }

    async findAll() {
        return InterestRate.find();
    }

    async findById(id) {
        return InterestRate.findById(id);
    }

    async update(id, data) {
        return InterestRate.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return InterestRate.findByIdAndDelete(id);
    }
}

export default new InterestRateRepository();
