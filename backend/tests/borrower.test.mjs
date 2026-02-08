import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js"; // make sure your Express app is exported from here
import Borrower from "../src/modules/borrower/borrower.model.js";
import { connectDB, clearDB, closeDB } from "./setup.mjs";

describe("Borrower API", () => {
    let borrowerId;

    beforeAll(async () => {
        await connectDB();
    });

    afterEach(async () => {
        await clearDB();
    });

    afterAll(async () => {
        await closeDB();
    });

    it("should create a borrower", async () => {
        const res = await request(app).post("/api/borrowers").send({
            fullName: "John Doe",
            phone: "0912345678",
            email: `john${Date.now()}@example.com`,
            address: "Yangon, Myanmar",
            nrc: `12/KaMaNa${Date.now()}`,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        borrowerId = res.body._id;
    });

    it("should get all borrowers", async () => {
        // create a borrower first
        await Borrower.create({
            fullName: "Jane Doe",
            phone: "0912345679",
            email: `jane${Date.now()}@example.com`,
            address: "Yangon, Myanmar",
            nrc: `12/KaMaNb${Date.now()}`,
        });

        const res = await request(app).get("/api/borrowers");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should get borrower by id", async () => {
        const borrower = await Borrower.create({
            fullName: "Alice Smith",
            phone: "0912345670",
            email: `alice${Date.now()}@example.com`,
            address: "Yangon, Myanmar",
            nrc: `12/KaMaNc${Date.now()}`,
        });

        const res = await request(app).get(`/api/borrowers/${borrower._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(String(borrower._id));
    });

    it("should update borrower", async () => {
        const borrower = await Borrower.create({
            fullName: "Bob Brown",
            phone: "0912345671",
            email: `bob${Date.now()}@example.com`,
            address: "Yangon, Myanmar",
            nrc: `12/KaMaNd${Date.now()}`,
        });

        const res = await request(app).put(`/api/borrowers/${borrower._id}`).send({
            fullName: "Bob Updated",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.fullName).toBe("Bob Updated");
    });

    it("should delete borrower", async () => {
        const borrower = await Borrower.create({
            fullName: "Charlie Green",
            phone: "0912345672",
            email: `charlie${Date.now()}@example.com`,
            address: "Yangon, Myanmar",
            nrc: `12/KaMaNe${Date.now()}`,
        });

        const res = await request(app).delete(`/api/borrowers/${borrower._id}`);
        expect(res.statusCode).toBe(200);

        const check = await Borrower.findById(borrower._id);
        expect(check).toBeNull();
    });
});
