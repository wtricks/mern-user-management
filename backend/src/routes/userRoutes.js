import express from 'express';
import { body, param, query, validationResult } from 'express-validator';

import { 
    deleteUser,
    forgetPassword, 
    getAllUsers, 
    getMe, 
    getUser, 
    resetPassword,
    signin, 
    signup, 
    updateUser,
    verifyToken
} from '../controllers/userController.js';

import storage from '../config/multer.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const userRoutes = express.Router();

// Utility function to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Sign Up
userRoutes.post('/signup', [
    body('firstName').notEmpty().withMessage('First name is required').bail().trim().isAlpha().withMessage('First name must contain only letters'),
    body('lastName').notEmpty().withMessage('Last name is required').bail().trim().isAlpha().withMessage('Last name must contain only letters'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], handleValidationErrors, signup);

// Sign In
userRoutes.post('/signin', [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
], handleValidationErrors, signin);

// Forget Password
userRoutes.post('/forget-password', [
    body('email').isEmail().withMessage('Email is invalid')
], handleValidationErrors, forgetPassword);

// Reset Password
userRoutes.post('/reset-password', [
    body('token').notEmpty().withMessage('Token is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], handleValidationErrors, resetPassword);

// Verify token
userRoutes.post('/verify-token', [
    body('token').notEmpty().withMessage('Token is required')
], handleValidationErrors, verifyToken);

// Get Current User Info (Me)
userRoutes.get('/me', authMiddleware, getMe);

// Get All Users (admin only)
userRoutes.get('/', authMiddleware, adminMiddleware, [
    query('search').optional().isString().withMessage('Search must be a string'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('sortBy').optional().isString().withMessage('SortBy must be a string'),
    query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('SortOrder must be "asc" or "desc"')
], handleValidationErrors, getAllUsers);

// Get User by ID (admin only)
userRoutes.get('/:id', authMiddleware, adminMiddleware, [
    param('id').isMongoId().withMessage('Invalid user ID format')
], handleValidationErrors, getUser);

// Update User
userRoutes.put('/:id', authMiddleware, [
    param('id').isMongoId().withMessage('Invalid user ID format'),
    body('role').optional().isIn(['admin', 'user']).withMessage('Role must be "admin" or "user"'),
    body('avatar').optional().isString().withMessage('Avatar must be a string'),
    body('firstName').optional().trim().isAlpha().withMessage('First name must contain only letters'),
    body('lastName').optional().trim().isAlpha().withMessage('Last name must contain only letters'),
    body('email').optional().isEmail().withMessage('Email is invalid')
], storage.single('avatar'), handleValidationErrors, updateUser);

// Delete User (admin only)
userRoutes.delete('/:id', authMiddleware, adminMiddleware, [
    param('id').isMongoId().withMessage('Invalid user ID format')
], handleValidationErrors, deleteUser);

export default userRoutes;
