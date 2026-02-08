// tests/contract.test.mjs
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js"; // your Express app
import Contract from "../src/modules/contract/contract.model.js";
import { connectDB, clearDB, closeDB } from "./setup.mjs";
import { createTestBorrower, createTestLoan } from "./setupData.mjs";

describe("Contract API", () => {
    let borrowerId;
    let loanId;
    let contractId;

    // Connect to in-memory DB before all tests
    beforeAll(async () => await connectDB());

    // Clear database after each test
    afterEach(async () => await clearDB());

    // Close DB after all tests
    afterAll(async () => await closeDB());

    beforeEach(async () => {
        // Create test borrower
        const borrower = await createTestBorrower();
        borrowerId = borrower._id;

        // Create test loan
        const loan = await createTestLoan(borrowerId);
        loanId = loan._id;
    });

    it("should get all contracts", async () => {
        // First create a contract
        await Contract.create({
            loan: loanId,
            documentUrl: "http://example.com/contract.pdf",
            signingDate: new Date(),
        });

        const res = await request(app).get("/api/contracts");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should get contract by id", async () => {
        const contract = await Contract.create({
            loan: loanId,
            documentUrl: "http://example.com/contract.pdf",
            signingDate: new Date(),
        });

        const res = await request(app).get(`/api/contracts/${contract._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(String(contract._id));
    });

    it("should get contracts by loan", async () => {
        await Contract.create({
            loan: loanId,
            documentUrl: "http://example.com/contract.pdf",
            signingDate: new Date(),
        });

        const res = await request(app).get(`/api/contracts/loan/${loanId}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
