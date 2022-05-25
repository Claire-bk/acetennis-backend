import express from 'express';
import { body } from 'express-validator';
import * as playerController from '../controllers/players.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

// Create a router so that we can define API
// router in this file.
const router = express.Router();

// validate & sanitize
const validatePlayer = [
    body('username').notEmpty().withMessage('name is missing'),
    body('date').trim().isDate({format: 'DD-MM-YYYY'}),
    // validate,
];

// Define an /players endpoint that reponds with specific player with username and date
router.get('/', playerController.existPlayer);
// Define an /players/:date endpoint that responds with specific player by event date
router.get('/:date', playerController.getPlayerByDate);
// Define an /plyers endpoint that create new player
router.post('/', playerController.createPlayer);
// Define an /players/:id endpoint that delete a player
router.delete('/:id', playerController.deletePlayer);

export default router;