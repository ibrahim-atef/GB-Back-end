/**
 * @author : Ameer Heiba
 * @description : This file contains the authentication middleware
 * @date : 28/08/2024
 * 
 * @param {Object} jwt - The jwt module.
 * @param {Function} authenticateJWT - Middleware function to authenticate JWT.
 * 
 */


const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        const secretKey = process.env.JWT_SECRET || "jwt_secret_key";
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            req.user = user; // Attach user info to the request
            next();
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = authenticateJWT;
