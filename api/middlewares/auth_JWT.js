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
const redisClient = require('../assets/Redis/RedisClient');

const checkBlacklist = async (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];

      // Check if the token is blacklisted
      const isBlacklisted = await redisClient.get(`blacklist:${token}`);
      if (isBlacklisted) {
          return res.status(401).json({ message: "Token is blacklisted" });
      }

      next();
  } catch (error) {
      console.error("Error in checkBlacklist:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const secretKey = process.env.JWT_SECRET || "jwt_secret_key";
    jwt.verify(token, secretKey, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const activeToken =await redisClient.get(`user:${user.id}:activeToken`);
  
      if (activeToken !== token) {
        return res.status(401).json({ message: "Session has expired. Please log in again." });
      }
      req.user = user; // Attach user info to the request
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticateJWT, checkBlacklist }; // Export authenticateJWT;
