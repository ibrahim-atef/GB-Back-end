const Role = require("../models/Role");
<<<<<<< Updated upstream
=======
const Permission = require("../models/Permission");
>>>>>>> Stashed changes

const seedRolesAndPermissions = async () => {
  try {
    // Check if roles and permissions already exist
    const existingRoles = await Role.findAll();
    if (existingRoles.length > 0) {
      console.log("Roles already seeded.");
      return;
    }

    // Define the roles
    const roles = [
      { name: "usersAdmin", description: "Can manage user accounts" },
      { name: "moderatorAdmin", description: "Can manage moderator accounts" },
      { name: "movieModerator", description: "Can manage movies only" },
      { name: "rulesAdmin", description: "Can manage roles and permissions" }, // New Role
    ];

    // Define CRUD permissions for users, moderators, movies, roles, and permissions
    const permissions = [
      // Permissions for users
      { action: "READ", resource: "USERS" },
      { action: "CREATE", resource: "USERS" },
      { action: "UPDATE", resource: "USERS" },
      { action: "DELETE", resource: "USERS" },
      // Permissions for moderators
      { action: "READ", resource: "MODERATORS" },
      { action: "CREATE", resource: "MODERATORS" },
      { action: "UPDATE", resource: "MODERATORS" },
      { action: "DELETE", resource: "MODERATORS" },
      // Permissions for movies
      { action: "READ", resource: "MOVIES" },
      { action: "CREATE", resource: "MOVIES" },
      { action: "UPDATE", resource: "MOVIES" },
      { action: "DELETE", resource: "MOVIES" },
      // Permissions for roles
      { action: "READ", resource: "ROLES" },
      { action: "CREATE", resource: "ROLES" },
      { action: "UPDATE", resource: "ROLES" },
      { action: "DELETE", resource: "ROLES" },
      // Permissions for permissions
      { action: "READ", resource: "PERMISSIONS" },
      { action: "CREATE", resource: "PERMISSIONS" },
      { action: "UPDATE", resource: "PERMISSIONS" },
      { action: "DELETE", resource: "PERMISSIONS" },
    ];

    // Seed permissions
    const seededPermissions = await Permission.bulkCreate(permissions);
    console.log("Permissions seeded successfully.");

    // Seed roles
    const seededRoles = await Role.bulkCreate(roles);
    console.log("Roles seeded successfully.");

    // Map permissions to roles
    const usersAdmin = seededRoles.find(role => role.name === "usersAdmin");
    const moderatorAdmin = seededRoles.find(role => role.name === "moderatorAdmin");
    const movieModerator = seededRoles.find(role => role.name === "movieModerator");
    const rulesAdmin = seededRoles.find(role => role.name === "rulesAdmin"); // New Role

    // Find permissions for each resource
    const userPermissions = seededPermissions.filter(permission => permission.resource === "USERS");
    const moderatorPermissions = seededPermissions.filter(permission => permission.resource === "MODERATORS");
    const moviePermissions = seededPermissions.filter(permission => permission.resource === "MOVIES");
    const rolePermissions = seededPermissions.filter(permission => permission.resource === "ROLES");
    const permissionPermissions = seededPermissions.filter(permission => permission.resource === "PERMISSIONS");

    // Associate permissions with roles
    if (usersAdmin) {
      await usersAdmin.addPermissions(userPermissions);
    }
    if (moderatorAdmin) {
      await moderatorAdmin.addPermissions(moderatorPermissions);
    }
    if (movieModerator) {
      await movieModerator.addPermissions(moviePermissions);
    }
    if (rulesAdmin) {
      // Give the rulesAdmin CRUD access to both roles and permissions
      await rulesAdmin.addPermissions([...rolePermissions, ...permissionPermissions]);
    }

    console.log("Role permissions linked successfully.");
  } catch (error) {
    console.error("Error seeding roles and permissions:", error);
  }
};

module.exports = seedRolesAndPermissions;
