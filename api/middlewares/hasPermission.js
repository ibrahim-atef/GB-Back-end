const Permission = require("../models/Permission");
const Role = require("../models/Role");
const User = require("../models/User");

const hasPermission = (action, resource) => {
  return async (req, res, next) => {
    try {
      // Assuming req.user contains the authenticated user data (set by the isAuth middleware)
      const userId = req.user.id;

      // Find the user along with their role and permissions
      const user = await User.findByPk(userId, {
        include: {
          model: Role,
          include: {
            model: Permission,
            through: 'RolePermission' // Ensure it fetches permissions through the join table
          }
        }
      });

      if (!user || !user.Role) {
        return res.status(403).json({ message: "Access denied: No role assigned" });
      }

      // Check if the user has the required permission
      const hasRequiredPermission = user.Role.Permissions.some(permission =>
        permission.action === action && permission.resource === resource
      );

      if (hasRequiredPermission) {
        return next(); // Permission granted, move to the next middleware/controller
      } else {
        return res.status(403).json({ message: "Access denied: Insufficient permissions" });
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = hasPermission; 
