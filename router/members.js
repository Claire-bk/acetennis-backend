import express from 'express';
import { body } from 'express-validator';
import * as memberController from '../controllers/members.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

// Create a router so that we can define API
// router in this file.
const router = express.Router();

// validate & sanitize
const validateMember = [
    body('username').notEmpty().withMessage('name is missing'),
    // validate,
];

// Define an /members endpoint that reponds with members
router.get('/', memberController.getMembers);
// define an /members/:id endpoint that delete an existing member
router.delete('/:id', memberController.removeMember);


export default router;