import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import rateLimit from './middleware/rate-limiter.js';
import matchRouter from './router/matches.js'
import playerRouter from './router/players.js';
import authRouter from './router/auth.js';
import eventRouter from './router/event.js';
import memberRouter from './router/members.js';


const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOption));    // Acess-Control-Aloow-Origin
app.use(rateLimit);

app.use('/matches', matchRouter);
app.use('/players', playerRouter);
app.use('/auth', authRouter);
app.use('/event', eventRouter);
app.use('/members', memberRouter);

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

const server = app.listen(config.port);
