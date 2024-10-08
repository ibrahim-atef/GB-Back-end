
/**
 * A middleware function to authorize user roles.
 * @author : Ameer Heiba
 * @description : This file contains a middleware that checks JWT payload for user role and authorize the user.
 * @date : 01/09/2024
 * @param {...string} allowedRoles - Variable number of allowed roles.
 * @return {function} A middleware function to check user role.
 */

const isAuthRole = (requiredRole) => {
    return (req, res, next) => {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Access is denied." });
      }
      next();
    };
  };
  

module.exports = isAuthRole;
