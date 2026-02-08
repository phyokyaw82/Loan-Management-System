import express from "express";
import transactionController from "../modules/transaction/transaction.controller.js";

const router = express.Router();

router.post("/", transactionController.create);
router.get("/", transactionController.getAll);
router.get("/:id", transactionController.getById);
router.get("/loan/:loanId", transactionController.getByLoan);
router.put("/:id", transactionController.update);
router.delete("/:id", transactionController.delete);

export default router;
