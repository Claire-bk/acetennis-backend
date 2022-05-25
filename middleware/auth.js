import jwt from 'jsonwebtoken';
import ip from 'ip';
import * as userModel from '../models/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = { message: 'Authentication Error' };

// Authorization
export const isAuth = async(req, res, next) => {
    const authHeader = req.get('Authorization');
    const whiteList = ['192.168.1.110'];
    const userIP = ip.address();

    whiteList.forEach(item => {
        if(item !== userIP) {
            return res.status(401).json("Wrong IP address");
        }
    });

    if(!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    // Verify if login user is the same user
    jwt.verify(
        token,
        config.jwt.secretKey,
        async(error, decoded) => {
            if(error) {
                return res.status(400).json(AUTH_ERROR);
            }
            
            const user = await userModel.findById(decoded.id);
            if(!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            req.token = token;
            next();
        }
    )
}