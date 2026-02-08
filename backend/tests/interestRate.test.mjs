import request from "supertest";
import app from "../src/app.js";
import { connectDB, closeDB, clearDB } from "./setup.mjs";

describe("Interest Rate API", () => {
    let rateId;

    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await closeDB();
    });

    afterEach(async () => {
        await clearDB(); // clear collections between tests
    });

    it("should create a new interest rate", async () => {
        const res = await request(app)
            .post("/api/interestrates")
            .send({ rate: 5 });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.rate).toBe(5);

        rateId = res.body._id;
    });

    it("should get all interest rates", async () => {
        // Create a rate first
        await request(app)
            .post("/api/interestrates")
            .send({ rate: 10 });

        const res = await request(app).get("/api/interestrates");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty("rate");
    });

    it("should get an interest rate by id", async () => {
        const createRes = await request(app)
            .post("/api/interestrates")
            .send({ rate: 15 });

        const res = await request(app).get(`/api/interestrates/${createRes.body._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(createRes.body._id);
        expect(res.body.rate).toBe(15);
    });

    it("should update an interest rate", async () => {
        const createRes = await request(app)
            .post("/api/interestrates")
            .send({ rate: 20 });

        const res = await request(app)
            .put(`/api/interestrates/${createRes.body._id}`)
            .send({ rate: 25 });

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(createRes.body._id);
        expect(res.body.rate).toBe(25);
    });

    it("should delete an interest rate", async () => {
        const createRes = await request(app)
            .post("/api/interestrates")
            .send({ rate: 30 });

        const res = await request(app).delete(`/api/interestrates/${createRes.body._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Deleted successfully");
    });
});
