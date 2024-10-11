const Role = require("../models/Role");

const seedRoles = async () => {
  try {
    // Check if roles already exist
    const existingRoles = await Role.findAll();
    if (existingRoles.length > 0) {
      console.log("Roles already seeded.");
      return;
    }

    // Define the roles
    const roles = [
      { name: "admin", description: "Has full access to all resources and can manage other users" },
      { name: "contentModerator", description: "Can manage movies and series content with specific permissions" },
      { name: "user", description: "Regular user with access to content based on subscription type" }
    ];

    // Seed roles
    await Role.bulkCreate(roles);
    console.log("Roles seeded successfully.");
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

module.exports = seedRoles;
