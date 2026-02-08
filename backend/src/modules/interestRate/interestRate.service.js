import interestRateRepository from "./interestRate.repository.js";

class InterestRateService {
    async createRate(data) {
        return interestRateRepository.create(data);
    }

    async getAllRates() {
        return interestRateRepository.findAll();
    }

    async getRateById(id) {
        return interestRateRepository.findById(id);
    }

    async updateRate(id, data) {
        return interestRateRepository.update(id, data);
    }

    async deleteRate(id) {
        return interestRateRepository.delete(id);
    }
}

export default new InterestRateService();
