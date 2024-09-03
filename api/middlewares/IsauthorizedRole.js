
/**
 * A middleware function to authorize user roles.
 * @author : Ameer Heiba
 * @description : This file contains a middleware that checks JWT payload for user role and authorize the user.
 * @date : 01/09/2024
 * @param {...string} allowedRoles - Variable number of allowed roles.
 * @return {function} A middleware function to check user role.
 */

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const { user } = req;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have the required role to access this resource." });
        }

        next();
    };
};

module.exports = authorizeRoles;
