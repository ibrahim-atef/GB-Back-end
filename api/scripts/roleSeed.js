const Role = require("../models/Role");
const Permission = require("../models/Permission");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      { name: "rulesAdmin", description: "Can manage roles and permissions" },
      { name: "devTeam", description: "Has full access to all resources and actions" }, // New Role
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
    const rulesAdmin = seededRoles.find(role => role.name === "rulesAdmin");
    const devTeam = seededRoles.find(role => role.name === "devTeam"); // New Role

    // Assign permissions to roles
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
      await rulesAdmin.addPermissions([...rolePermissions, ...permissionPermissions]);
    }
    if (devTeam) {
      // Assign all permissions to the devTeam role
      await devTeam.addPermissions(seededPermissions);
    }

    console.log("Role permissions linked successfully.");

    // Create dummy users for each role
    const passwordHash = await bcrypt.hash("password123", 10); // Hash a default password

    const users = [
      {
        username: "adminUser", 
        email: "admin@example.com",
        password: passwordHash,
        fullName: "Admin User",
        roleId: usersAdmin ? usersAdmin.id : null,
        isPrime: true,
      },
      {
        username: "moderatorUser",
        email: "moderator@example.com",
        password: passwordHash,
        fullName: "Moderator User",
        roleId: moderatorAdmin ? moderatorAdmin.id : null,
        isPrime: false,
      },
      {
        username: "movieModeratorUser",
        email: "moviemod@example.com",
        password: passwordHash,
        fullName: "Movie Moderator",
        roleId: movieModerator ? movieModerator.id : null,
        isPrime: false,
      },
      {
        username: "rulesAdminUser",
        email: "rulesadmin@example.com",
        password: passwordHash,
        fullName: "Rules Admin",
        roleId: rulesAdmin ? rulesAdmin.id : null,
        isPrime: true,
      },
      {
        username: "devTeamUser",
        email: "devteam@example.com",
        password: passwordHash,
        fullName: "Dev Team User",
        roleId: devTeam ? devTeam.id : null,
        isPrime: true,
      },
    ];

    await User.bulkCreate(users);
    console.log("Dummy users created successfully.");

  } catch (error) {
    console.error("Error seeding roles, permissions, or users:", error);
  }
};

module.exports = seedRolesAndPermissions;
