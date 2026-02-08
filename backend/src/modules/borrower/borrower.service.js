import borrowerRepository from "./borrower.repository.js";

class BorrowerService {
    createBorrower(data) {
       return borrowerRepository.create(data);
    }

    getAllBorrowers() {
        return borrowerRepository.findAll();
    }

    getBorrowerById(id) {
        return borrowerRepository.findById(id);
    }

    updateBorrower(id, data) {
        return borrowerRepository.update(id, data);
    }

    deleteBorrower(id) {
        return borrowerRepository.delete(id);
    }
}

export default new BorrowerService();
