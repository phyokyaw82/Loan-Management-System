import request from "supertest";
import app from "../src/app.js";
import { connectDB, closeDB, clearDB } from "./setup.mjs";
import { createTestBorrower, createTestLoan } from "./setupData.mjs";

describe("Repayment API", () => {
    let borrower;
    let loan;

    beforeAll(async () => {
        await connectDB();
        borrower = await createTestBorrower();
        loan = await createTestLoan(borrower._id);
    });

    afterAll(async () => {
        await closeDB();
    });

    afterEach(async () => {
        await clearDB();
        borrower = await createTestBorrower();
        loan = await createTestLoan(borrower._id);
    });

    it("should create a new repayment", async () => {
        const res = await request(app)
            .post("/api/repayments")
            .send({
                loan: loan._id,
                paymentDate: new Date(),
                amountPaid: 500,
                paymentTerm: 1,
                description: "First payment",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");

        // handle populated or plain ObjectId
        const loanId = res.body.loan._id ? res.body.loan._id : res.body.loan;
        expect(loanId).toBe(String(loan._id));
    });

    it("should get all repayments", async () => {
        await request(app)
            .post("/api/repayments")
            .send({
                loan: loan._id,
                paymentDate: new Date(),
                amountPaid: 500,
                paymentTerm: 1,
            });

        const res = await request(app).get("/api/repayments");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        // Check loan id (may be populated or just ObjectId)
        expect(res.body[0].loan._id || res.body[0].loan).toBe(String(loan._id));
    });

    it("should get repayment by id", async () => {
        const repaymentRes = await request(app)
            .post("/api/repayments")
            .send({
                loan: loan._id,
                paymentDate: new Date(),
                amountPaid: 500,
                paymentTerm: 1,
            });

        const res = await request(app).get(`/api/repayments/${repaymentRes.body._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(String(repaymentRes.body._id));
        expect(res.body.loan._id || res.body.loan).toBe(String(loan._id));
    });

    it("should get repayments by loan", async () => {
        await request(app)
            .post("/api/repayments")
            .send({
                loan: loan._id,
                paymentDate: new Date(),
                amountPaid: 500,
                paymentTerm: 1,
            });

        const res = await request(app).get(`/api/repayments/loan/${loan._id}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].loan._id || res.body[0].loan).toBe(String(loan._id));
    });

    it("should update a repayment", async () => {
        const repaymentRes = await request(app)
            .post("/api/repayments")
            .send({
                loan: loan._id,
                paymentDate: new Date(),
                amountPaid: 500,
                paymentTerm: 1,
                description: "Initial payment",
            });

        const res = await request(app)
            .put(`/api/repayments/${repaymentRes.body._id}`)
            .send({
                amountPaid: 600,
                description: "Updated payment",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.amountPaid).toBe(600);
        expect(res.body.description).toBe("Updated payment");
        expect(res.body.loan._id || res.body.loan).toBe(String(loan._id));
    });

    it("should delete a repayment", async () => {
        const repaymentRes = await request(app)
            .post("/api/repayments")
            .send({
                loan: loan._id,
                paymentDate: new Date(),
                amountPaid: 500,
                paymentTerm: 1,
            });

        const res = await request(app).delete(`/api/repayments/${repaymentRes.body._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Deleted successfully");
    });
});
