const Role = require("../models/Role");
const Permission = require("../models/Permission");
const RolePermission = require("../models/RolePermission");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRole = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newRole = await Role.create({ name, description });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRole = async (req, res) => {
    const { roleId } = req.params;
    const { name, description } = req.body;
    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found." });
        }
        role.name = name || role.name;
        role.description = description || role.description;
        await role.save();
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRole = async (req, res) => {
    const { roleId } = req.params;
    try {
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found." });
        }
        await role.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPermission = async (req, res) => {
    const { action, resource } = req.body;
    try {
        const newPermission = await Permission.create({ action, resource });
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePermission = async (req, res) => {
    const { permissionId } = req.params;
    const { action, resource } = req.body;
    try {
        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found." });
        }
        permission.action = action || permission.action;
        permission.resource = resource || permission.resource;
        await permission.save();
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePermission = async (req, res) => {
    const { permissionId } = req.params;
    try {
        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found." });
        }
        await permission.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addPermissionToRole = async (req, res) => {
    const { roleId, permissionId } = req.params;
    try {
        const role = await Role.findByPk(roleId);
        const permission = await Permission.findByPk(permissionId);
        if (!role || !permission) {
            return res.status(404).json({ message: "Role or Permission not found." });
        }
        await role.addPermission(permission);
        res.status(200).json({ message: "Permission added to role." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removePermissionFromRole = async (req, res) => {
    const { roleId, permissionId } = req.params;
    try {
        const role = await Role.findByPk(roleId);
        const permission = await Permission.findByPk(permissionId);
        if (!role || !permission) {
            return res.status(404).json({ message: "Role or Permission not found." });
        }
        await role.removePermission(permission);
        res.status(200).json({ message: "Permission removed from role." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    createRole,
    getAllRoles,
    updateRole,
    deleteRole,
    createPermission,
    getAllPermissions,
    updatePermission,
    deletePermission,
    addPermissionToRole,
    removePermissionFromRole,
};
