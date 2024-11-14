import { matchedData } from 'express-validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path'

import { rootDirectory } from '../config/constants.js';

import transporter from '../config/mail.js';
import User from '../models/User.js';

/**
 * Handles user signup by validating input, checking for existing users, and creating a new user if necessary.
 * 
 * If a user with the given email already exists, it returns a 400 status with an error message.
 * If the user is new, it creates and saves the user, returning a 201 status with the user data.
 * In case of any errors, it logs the error and responds with a 500 status.
 * 
 * @param {Object} req - Request object containing user data (firstName, lastName, email, password).
 * @param {Object} res - Response object used to send the response.
 */
export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = matchedData(req);

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, bcryptjs.genSaltSync(10));
        const randomToken = await bcryptjs.hash(email, bcryptjs.genSaltSync(10));

        const newUser = new User({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword,
            token: randomToken,
            tokenExp: Date.now() + (10 * 60 * 1000), // 10 minutes
        });

        await newUser.save();

        // generate verification link
        const verificationLink = `${process.env.FRONTEND_URI}/auth/verify?token=${randomToken}`;

        console.log(process.env.EMAIL_FROM);

        // send email (without 'await')
        transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Welcome to our app',
            html: `Verify you email by clicking <a href="${verificationLink}">here</a>`,
        });

        res.status(201).json({ message: 'Verify your email address.', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Handles user signin by validating input, checking for existing users, and creating a JSON Web Token if credentials are correct.
 * 
 * If the user is not found or not active, it returns a 400 status with an appropriate error message.
 * If the user is found and active, it generates a JSON Web Token containing the user's ID and role and returns a 200 status with the user data and the access token.
 * In case of any errors, it logs the error and responds with a 500 status.
 * 
 * @param {Object} req - Request object containing user data (email, password).
 * @param {Object} res - Response object used to send the response.
 */
export const signin = async (req, res) => {
    const { email, password } = matchedData(req);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.active !== 1) {
            return res.status(400).json({ message: 'User is not active' });
        }

        if (!await bcryptjs.compare(password, user.password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        user.lastLogin = Date.now();
        user.loginIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        await user.save();

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'User signed in successfully', user, accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Handles password reset by validating input, checking for existing users, generating a random token, and saving it to the user.
 * 
 * If the user is not found, it returns a 400 status with an error message.
 * If the user is found, it generates a new random token, saves it to the user, and sends a verification link to the user's email.
 * The link is valid for 10 minutes.
 * In case of any errors, it logs the error and responds with a 500 status.
 * 
 * @param {Object} req - Request object containing user data (email).
 * @param {Object} res - Response object used to send the response.
 */
export const forgetPassword = async (req, res) => {
    const { email } = matchedData(req);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.active == 2) {
            return res.status(400).json({ message: 'User is disabled' });
        }

        const randomToken = await bcryptjs.hash(email, bcryptjs.genSaltSync(10));

        user.token = randomToken;
        user.tokenExp = Date.now() + (10 * 60 * 1000); // 10 minutes
        await user.save();

        // generate verification link
        const verificationLink = `${process.env.FRONTEND_URI}/auth/reset-password?token=${randomToken}`;

        // send email (without 'await')
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset your password',
            html: `Reset your password by clicking <a href="${verificationLink}">here</a>`,
        });

        res.status(200).json({ message: 'Check your email to reset your password' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Handles password reset by validating input, checking for existing users with a valid token, and saving the new password to the user.
 * 
 * If the token is invalid or expired, it returns a 400 status with an error message.
 * If the user is found, it hashes the new password, saves it to the user, and sets the token and expiration to null.
 * The user is then logged in and a 200 status is returned with a success message.
 * In case of any errors, it logs the error and responds with a 500 status.
 * 
 * @param {Object} req - Request object containing user data (token, password).
 * @param {Object} res - Response object used to send the response.
 */
export const resetPassword = async (req, res) => {
    const { password, token } = matchedData(req);

    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        if (user.tokenExp < Date.now()) {
            return res.status(400).json({ message: 'Token is expired' });
        }

        const hashedPassword = await bcryptjs.hash(password, bcryptjs.genSaltSync(10));

        user.active = 1;
        user.password = hashedPassword;
        user.token = null;
        user.tokenExp = null;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Verifies the token by validating input, checking for existing users with a valid token, and returns a 200 status with a success message if the token is valid.
 * If the token is invalid or expired, it returns a 400 status with an error message.
 * In case of any errors, it logs the error and responds with a 500 status.
 * 
 * @param {Object} req - Request object containing the token.
 * @param {Object} res - Response object used to send the response.
 */
export const verifyToken = async (req, res) => {
    const { token } = matchedData(req);

    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        if (user.tokenExp < Date.now()) {
            return res.status(400).json({ message: 'Token is expired' });
        }

        user.active = 1;
        user.token = null;
        user.tokenExp = null;
        await user.save();

        res.status(200).json({ message: 'Email is verified.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Returns the user object associated with the JWT token in the Authorization header.
 * If the user is not found, it returns a 404 status with a 'User not found' message.
 * If any errors occur, it logs the error and responds with a 500 status.
 * @param {Object} req - Request object containing the JWT token in the Authorization header.
 * @param {Object} res - Response object used to send the response.
 */
export const getMe = async (req, res) => {
    const userId = req.user.id;

    try  {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Returns a list of users matching the query.
 * The query is a MongoDB filter object.
 * The limit is the maximum number of users to return.
 * The page is the page number to return.
 * The sortBy is the field to sort by.
 * The sortOrder is the order to sort by.
 * If any errors occur, it logs the error and responds with a 500 status.
 * @param {Object} req - Request object containing the query, limit, page, sortBy, and sortOrder.
 * @param {Object} res - Response object used to send the response.
 */
export const getAllUsers = async (req, res) => {
    const { 
        query = '', 
        limit = 10, 
        page = 1, 
        sortBy = '_id', 
        sortOrder = 'asc' 
    } = matchedData(req);

    try {
        const users = await User.find({ 
            $or: [
                { firstName: { $regex: query, $options: 'i' } }, 
                { lastName: { $regex: query, $options: 'i' } }
            ] 
        }).select('-password -token -tokenExp')
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ [sortBy]: sortOrder == 'asc' ? 1 : -1 });

        const total = await User.countDocuments({
            $or: [
                { firstName: { $regex: query, $options: 'i' } }, 
                { lastName: { $regex: query, $options: 'i' } }
            ]
            });

        res.status(200).json({users, total});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Returns a single user by ID.
 * If the user is not found, it returns a 404 status with a 'User not found' message.
 * If any errors occur, it logs the error and responds with a 500 status.
 * @param {Object} req - Request object containing the user ID.
 * @param {Object} res - Response object used to send the response.
 */
export const getUser = async (req, res) => {
    const { id } = matchedData(req);

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Updates a user's profile information, including first name, last name, and avatar.
 * 
 * If the user is not found, it returns a 404 status with a 'User not found' message.
 * If an avatar file is uploaded, it deletes the old avatar file from the server.
 * Updates the user's first name, last name, and avatar if provided, and saves the changes.
 * Returns a 200 status with the updated user data upon success.
 * In case of any errors, it logs the error and responds with a 500 status.
 * 
 * @param {Object} req - Request object containing user data (firstName, lastName) and file (avatar).
 * @param {Object} res - Response object used to send the response.
 */
export const updateUser = async (req, res) => {
    // TODO: use 'matchedData' here
    const { firstName, lastName, role, email } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const avatar = req.file ? ('uploads/' + req.file.filename) : user.avatar;
        if (req.file && user.avatar) {
            const filePath = path.join(rootDirectory, user.avatar);
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) throw new Error("Failed to delete old avatar file");
                });
            }
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.avatar = avatar || user.avatar;

        if (req.user.role == 'admin') {
            user.role = req.user.id == req.params.id ? 'admin' : (role || user.role);
            user.email = email || user.email;
        }

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Deletes a user by ID.
 * If the user is not found, it returns a 404 status with a 'User not found' message.
 * If any errors occur, it logs the error and responds with a 500 status.
 * @param {Object} req - Request object containing the user ID.
 * @param {Object} res - Response object used to send the response.
 */
export const deleteUser = async (req, res) => {
    const { id } = matchedData(req);

    if (req.user.id == id && req.user.role == 'admin') {
        return res.status(400).json({ message: 'You cannot delete yourself' });
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};