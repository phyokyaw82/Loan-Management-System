import express from "express";
import borrowerController from "../modules/borrower/borrower.controller.js";

const router = express.Router();

router.post("/", borrowerController.create);
router.get("/", borrowerController.getAll);
router.get("/:id", borrowerController.getById);
router.put("/:id", borrowerController.update);
router.delete("/:id", borrowerController.delete);

export default router;
