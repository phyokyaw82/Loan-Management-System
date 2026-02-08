import express from "express";
import repaymentController from "../modules/repayment/repayment.controller.js";

const router = express.Router();

router.post("/", repaymentController.create);
router.get("/", repaymentController.getAll);
router.get("/:id", repaymentController.getById);
router.get("/loan/:loanId", repaymentController.getByLoan);
router.put("/:id", repaymentController.update);
router.delete("/:id", repaymentController.delete);

export default router;
