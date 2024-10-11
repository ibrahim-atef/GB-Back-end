const Permission = require("../models/Permission");
const Role = require("../models/Role");
const User = require("../models/User");

const hasPermission = (action, resource) => {
  return async (req, res, next) => {
      try {
          const user = req.user; // Assuming the user is stored in req.user after authentication
          console.log(user);
          const userRole = await Role.findByPk(user.roleId, {
              include: {
                  model: Permission,
                  where: {
                      action,
                      resource
                  }
              }
          });

          if (!userRole) {
              return res.status(403).json({ message: "Access denied." });
          }
          console.log(userRole);
          next();
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };
};


module.exports = hasPermission; 
