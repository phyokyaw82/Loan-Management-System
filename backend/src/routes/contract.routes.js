import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import contractController from "../modules/contract/contract.controller.js";

const router = express.Router();

// Ensure uploads/contracts folder exists
const uploadDir = path.join(process.cwd(), "uploads/contracts");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Setup multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/contracts");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("document"), contractController.upload);
router.put("/:id", upload.single("document"), contractController.update);
router.get("/", contractController.getAll);
router.get("/:id", contractController.getById);
router.get("/loan/:loanId", contractController.getByLoan);
router.delete("/:id", contractController.delete);

export default router;
