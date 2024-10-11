const sequelize = require("../assets/SQLDB/db").sqlDB;
const { DataTypes } = require("sequelize");
const Role = require("./Role");
const Permission = require("./Permission");

const RolePermission = sequelize.define("RolePermission", {}, {
    timestamps: false
});

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

module.exports = RolePermission;
