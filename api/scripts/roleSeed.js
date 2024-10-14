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
      { name: "user", description: "Normal user" },
      { name: "moderatorAdmin", description: "Can manage moderator accounts" },
      { name: "movieModerator", description: "Can manage movies only" },
      { name: "seriesModerator", description: "Can manage series only" }, // New Role
      { name: "tvShowModerator", description: "Can manage TV shows only" }, // New Role
      { name: "rulesAdmin", description: "Can manage roles and permissions" },
      { name: "devTeam", description: "Has full access to all resources and actions" }, // New Role
    ];

    // Define CRUD permissions for users, moderators, movies, series, TV shows, roles, and permissions
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
      // Permissions for series
      { action: "READ", resource: "SERIES" },
      { action: "CREATE", resource: "SERIES" },
      { action: "UPDATE", resource: "SERIES" },
      { action: "DELETE", resource: "SERIES" },
      // Permissions for TV shows
      { action: "READ", resource: "TV_SHOWS" },
      { action: "CREATE", resource: "TV_SHOWS" },
      { action: "UPDATE", resource: "TV_SHOWS" },
      { action: "DELETE", resource: "TV_SHOWS" },
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
    const seriesModerator = seededRoles.find(role => role.name === "seriesModerator");
    const tvShowModerator = seededRoles.find(role => role.name === "tvShowModerator");
    const rulesAdmin = seededRoles.find(role => role.name === "rulesAdmin");
    const devTeam = seededRoles.find(role => role.name === "devTeam");
    const user = seededRoles.find(role => role.name === "user");

    // Assign permissions to roles
    const userPermissions = seededPermissions.filter(permission => permission.resource === "USERS");
    const moderatorPermissions = seededPermissions.filter(permission => permission.resource === "MODERATORS");
    const moviePermissions = seededPermissions.filter(permission => permission.resource === "MOVIES");
    const seriesPermissions = seededPermissions.filter(permission => permission.resource === "SERIES");
    const tvShowPermissions = seededPermissions.filter(permission => permission.resource === "TV_SHOWS");
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
    if (seriesModerator) {
      await seriesModerator.addPermissions(seriesPermissions);
    }
    if (tvShowModerator) {
      await tvShowModerator.addPermissions(tvShowPermissions);
    }
    if (rulesAdmin) {
      await rulesAdmin.addPermissions([...rolePermissions, ...permissionPermissions]);
    }
    if (devTeam) {
      // Assign all permissions to the devTeam role
      await devTeam.addPermissions(seededPermissions);
    }
    if (user) {
      // Users can only read their own information
      await user.addPermissions(userPermissions.filter(permission => permission.action === "READ"));
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
        username: "seriesModeratorUser",
        email: "seriesmod@example.com",
        password: passwordHash,
        fullName: "Series Moderator",
        roleId: seriesModerator ? seriesModerator.id : null,
        isPrime: false,
      },
      {
        username: "tvShowModeratorUser",
        email: "tvshowmod@example.com",
        password: passwordHash,
        fullName: "TV Show Moderator",
        roleId: tvShowModerator ? tvShowModerator.id : null,
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
      {
        username: "normalUser",
        email: "norm@example.com",
        password: passwordHash,
        fullName: "Normal User",
        roleId: user ? user.id : null,
        isPrime: false,
      }
    ];

    await User.bulkCreate(users);
    console.log("Dummy users created successfully.");

  } catch (error) {
    console.error("Error seeding roles, permissions, or users:", error);
  }
};

module.exports = seedRolesAndPermissions;
