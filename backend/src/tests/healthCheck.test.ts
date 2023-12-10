import request from "supertest";
import express, { Application } from "express";

const app = express();

describe('healthCheckTest', () => {
    it("GET /", () => {
        request(app).get("/").expect("Welcome to Express & TypeScript Server");
    })
})