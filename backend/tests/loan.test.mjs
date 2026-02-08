// tests/loan.test.mjs
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js"; // your Express app
import Loan from "../src/modules/loan/loan.model.js";
import { connectDB, clearDB, closeDB } from "./setup.mjs";
import { createTestBorrower } from "./setupData.mjs";

describe("Loan API", () => {
    let borrowerId;
    let loanId;

    // Connect to in-memory DB before all tests
    beforeAll(async () => await connectDB());

    // Clear DB after each test
    afterEach(async () => await clearDB());

    // Close DB after all tests
    afterAll(async () => await closeDB());

    beforeEach(async () => {
        // Create a test borrower
        const borrower = await createTestBorrower();
        borrowerId = borrower._id;
    });

    it("should create a new loan", async () => {
        const res = await request(app)
            .post("/api/loans")
            .send({
                borrower: borrowerId,
                amount: 5000,
                type: "Personal",
                interestRate: 5,
                startDate: new Date(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.borrower).toBe(String(borrowerId));
        loanId = res.body._id;
    });

    it("should get all loans", async () => {
        // Create a loan first
        await Loan.create({
            borrower: borrowerId,
            amount: 5000,
            type: "Personal",
            interestRate: 5,
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        const res = await request(app).get("/api/loans");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should get loan by id", async () => {
        const loan = await Loan.create({
            borrower: borrowerId,
            amount: 5000,
            type: "Personal",
            interestRate: 5,
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        const res = await request(app).get(`/api/loans/${loan._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(String(loan._id));
    });

    it("should update loan", async () => {
        const loan = await Loan.create({
            borrower: borrowerId,
            amount: 5000,
            type: "Personal",
            interestRate: 5,
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        const res = await request(app)
            .put(`/api/loans/${loan._id}`)
            .send({ amount: 6000 });

        expect(res.statusCode).toBe(200);
        expect(res.body.amount).toBe(6000);
    });

    it("should delete loan", async () => {
        const loan = await Loan.create({
            borrower: borrowerId,
            amount: 5000,
            type: "Personal",
            interestRate: 5,
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        const res = await request(app).delete(`/api/loans/${loan._id}`);
        expect(res.statusCode).toBe(200);

        const check = await Loan.findById(loan._id);
        expect(check).toBeNull();
    });
});
