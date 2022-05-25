import rateLimit from 'express-rate-limit';
import { config } from '../config.js';

export default rateLimit({
    windowMs: config.rateLimit.windowMs,    // 24hrs 
    max: config.rateLimit.maxRequest,       // limit each IP to 1000 requests per windowMs
    delayMs: config.delayMs                 // Rate limit Web Service to one request per second per user session
})