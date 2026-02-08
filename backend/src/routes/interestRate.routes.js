import express from "express";
import interestRateController from "../modules/interestRate/interestRate.controller.js";

const router = express.Router();

router.post("/", interestRateController.create);
router.get("/", interestRateController.getAll);
router.get("/:id", interestRateController.getById);
router.put("/:id", interestRateController.update);
router.delete("/:id", interestRateController.delete);

export default router;
