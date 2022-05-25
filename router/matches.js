import express from 'express';
import { body } from 'express-validator';
import * as matchController from '../controllers/matches.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

// Create a router so that we can define API
// router in this file.
const router = express.Router();

// validate & sanitize
const validateMatch = [
    body('date').trim().isDate({format: 'DD-MM-YYYY'}),
    body('courtNum').trim().isInt({max: 30}),
    body('scoreA').trim().isInt({max: 10}),
    body('scoreB').trim().isInt({max: 10}),
    validate,
];

// Define an /matches/:date endpoint that responds with specific match by date
router.get('/', matchController.getMatch);
// Define an /matches endpoint that create a match
router.post('/', matchController.createMatch);
// define an /matches/:id endpoint that responds with specific match by id
router.put('/:id', matchController.updateMatch);
// define an /matches/:id endpoint that delete an existing match
router.delete('/:id', matchController.removeMatch);

export default router;