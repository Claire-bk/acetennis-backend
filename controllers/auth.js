import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userModel from '../models/auth.js';
import * as logModel from '../models/log.js'
import { config } from '../config.js';

// Signup 
export async function signup(req, res) {
    const { username, password, name, email, level, role} = req.body;
    // const { username, password, name, email, level, ip, role, method } = req.body;
    const ip = req.ip;
    const method = req.method;
    // Check if the user is already existed
    const found = await userModel.findByUsername(username);

    console.log(found)

    if(found) {
        return res.status(409).json({ message: `${username} already exists`});
    }

    // Hash password
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    // Create new user
    const userId = await userModel.createUser({
        username,
        password: hashed,
        name,
        email,
        level,
        role
    });
    // Create JsonWebToken for authorization
    const token = createJwtToken(userId);
    // save log 
    await logModel.log(userId, ip, role, method);

    res.status(201).json({ token, username });
}

// login
export async function login(req, res) {
    const { username, password, role } = req.body;
    const ip = req.ip;
    const method = req.method;

    // Get user data
    const user = await userModel.findByUsername(username);
    // const count = await userModel.countUser();
    // console.log(`user count ${count['COUNT(*)']}`)

    if(!user) {
        return res.status(401).json({ message: 'Invalid user or password'});
    }

    if(role !== user.role) {
        return res.status(401).json({ message: 'Invalid user or password'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password'});
    }

    // Create JsonWebToken for authorization
    const token = createJwtToken(user.id);

    // save log 
    await logModel.log(user.id, ip, role, method);

    res.status(200).json({ token, username, role});
}

export async function countUser(req, res, next) {
    const count = await userModel.countUser();
    
    res.status(200).json({ count });
}

export async function me(req, res, next) {
    const user = await userModel.findById(req.userId);
    if(!user) {
        return res.status(404).json({ Message: 'User not found'});
    }
    res.status(200).json({ token: req.token, username: user.username });
}

// Create JsonWebToken
function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}