import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if(value == null) {
        throw new Error(`key ${key} is undefined`)
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)), // 24hrs
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
    },
    port: parseInt(required('PORT', 8080)),
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD'),
        timezone: 'utc+10',
    },
    cors: {
        allowedOrigin: required('CORS_ALLOW_ORIGIN'),
    },
    rateLimit: {
        windowMs: 86400000, // 24hrs 60 * 60* 24 * 1000
        maxRequest: 1000,   // limit each IP to 1000 requests per windowMs
        delayMs: 1000,
    }
}