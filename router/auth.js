import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controllers/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// validation for username and password
const validateCredential = [
    body('username').trim().notEmpty().withMessage('username should be at least 5 characters'),
    body('password').trim().isLength({ min: 6 }).withMessage('password should be at least 6 characters'),
    validate,
];

// validation for signup
const validateSignup = [
    ...validateCredential,
    body('name').trim().notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    validate,
];

// Defind an /auth/signup endpoint that create new user
router.post('/signup', validateSignup, authController.signup);
// Define an  /auth/login endpoint that login user
router.post('/login', validateCredential, authController.login);
// Define an /auth/me endpoint that validate user
router.get('/me', isAuth, authController.me);   // Check if the user is validate after login
router.get('/count', authController.countUser);

export default router;