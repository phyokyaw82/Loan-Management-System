import express from "express";
import loanController from "../modules/loan/loan.controller.js";

const router = express.Router();

router.post("/", loanController.create);
router.get("/", loanController.getAll);
router.get("/:id", loanController.getById);
router.put("/:id", loanController.update);
router.delete("/:id", loanController.delete);

export default router;
