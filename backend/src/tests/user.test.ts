// FILEPATH: /c:/Users/Sile/Desktop/Facultate/MASTER/AN1/MOPS/MOPS_GIT/MOPS/backend/src/tests/userController.test.ts

import express from "express";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/userModel';
import { userRouter } from "../routes/userRoute";

jest.mock('../models/userModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.post('/api', userRouter);

describe('registerUser', () => {
    beforeEach(() => {
        (User.create as jest.Mock).mockClear();
        (bcrypt.genSalt as jest.Mock).mockClear();
        (bcrypt.hash as jest.Mock).mockClear();
    });

    it('should return 400 for invalid email format', async () => {
        const newUser = {
            Username: 'Test User',
            Email: 'invalidEmail',
            Password: 'password',
            Role: 'Customer',
            Nickname: 'Test'
        };

        const response = await request(app)
            .post('/users/register')
            .send(newUser);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

});

describe('loginUser', () => {
    beforeEach(() => {
        (User.findOne as jest.Mock).mockClear();
        (bcrypt.compare as jest.Mock).mockClear();
        (jwt.sign as jest.Mock).mockClear();
    });

    it('should return 404 if user is not found', async () => {
        const credentials = {
            Username: 'Test User',
            Password: 'password'
        };

        (User.findOne as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .post('/users/login')
            .send(credentials);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

    it('should return 404 if password is incorrect', async () => {
        const credentials = {
            Username: 'Test User',
            Password: 'password'
        };

        const user = {
            _id: 'userId',
            Role: 'Customer',
            Username: credentials.Username,
            Password: 'hashedPassword'
        };

        (User.findOne as jest.Mock).mockResolvedValue(user);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const response = await request(app)
            .post('/users/login')
            .send(credentials);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });
});


describe('getUserByUsername', () => {
    beforeEach(() => {
        (User.findOne as jest.Mock).mockClear();
    });

    it('should return 404 if user is not found', async () => {
        const username = 'Test User';

        (User.findOne as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .get(`/users/${username}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

});

describe('updateUser', () => {
    beforeEach(() => {
        (User.findOneAndUpdate as jest.Mock).mockClear();
        (bcrypt.genSalt as jest.Mock).mockClear();
        (bcrypt.hash as jest.Mock).mockClear();
    });

    it('should return 404 if user is not found', async () => {
        const username = 'Test User';
        const updateData = {
            Nickname: 'New Nickname',
            Email: 'newemail@test.com',
            Role: 'Admin',
            Password: 'newpassword'
        };

        (User.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .put(`/users/${username}`)
            .send(updateData);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });
});

describe('deleteUser', () => {
    beforeEach(() => {
        (User.findOneAndDelete as jest.Mock).mockClear();
    });

    it('should return 404 if user is not found', async () => {
        const username = 'Test User';

        (User.findOneAndDelete as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .delete(`/user/${username}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });
});