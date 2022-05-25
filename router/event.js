import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as eventController from '../controllers/event.js';

const router = express.Router();

router.get('/', eventController.getEvent);
// Define an /event/:date endpoint that responds with specific event by date
router.post('/', eventController.setEvent);

export default router; 