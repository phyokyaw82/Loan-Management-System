// tests/transaction.test.mjs
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js"; // your Express app
import { connectDB, clearDB, closeDB } from "./setup.mjs";
import { createTestBorrower, createTestLoan } from "./setupData.mjs";
import Transaction from "../src/modules/transaction/transaction.model.js";

let borrower, loan, transactionId;

beforeAll(async () => {
    await connectDB();
    borrower = await createTestBorrower();
    loan = await createTestLoan(borrower._id);
});

afterEach(async () => {
    await clearDB();
    borrower = await createTestBorrower();
    loan = await createTestLoan(borrower._id);
});

afterAll(async () => {
    await closeDB();
});

describe("Transaction API", () => {
    it("should create a transaction", async () => {
        const res = await request(app)
            .post("/api/transactions")
            .send({
                loan: loan._id,
                type: "Repayment",
                amount: 500,
                description: "First repayment",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.loan).toBe(String(loan._id));
        transactionId = res.body._id;
    });

    it("should get all transactions", async () => {
        await Transaction.create({
            loan: loan._id,
            type: "Repayment",
            amount: 500,
        });

        const res = await request(app).get("/api/transactions");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should get transaction by id", async () => {
        const transaction = await Transaction.create({
            loan: loan._id,
            type: "Repayment",
            amount: 500,
        });

        const res = await request(app).get(`/api/transactions/${transaction._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(String(transaction._id));
        expect(res.body.loan._id).toBe(String(loan._id));
    });

    it("should get transactions by loan", async () => {
        const transaction = await Transaction.create({
            loan: loan._id,
            type: "Repayment",
            amount: 500,
        });

        const res = await request(app).get(`/api/transactions/loan/${loan._id}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

        res.body.forEach(tx => {
            expect(tx.loan).not.toBeNull();
            expect(tx.loan._id).toBe(String(loan._id));
        });
    });

    it("should update a transaction", async () => {
        const transaction = await Transaction.create({
            loan: loan._id,
            type: "Repayment",
            amount: 500,
        });

        const res = await request(app)
            .put(`/api/transactions/${transaction._id}`)
            .send({
                amount: 600,
                description: "Updated repayment",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.amount).toBe(600);
        expect(res.body.description).toBe("Updated repayment");
    });

    it("should delete a transaction", async () => {
        const transaction = await Transaction.create({
            loan: loan._id,
            type: "Repayment",
            amount: 500,
        });

        const res = await request(app).delete(`/api/transactions/${transaction._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Transaction deleted successfully");

        const check = await Transaction.findById(transaction._id);
        expect(check).toBeNull();
    });
});
