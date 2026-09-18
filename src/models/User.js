const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    companyId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },

    roleId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    userType: {
      type: DataTypes.ENUM(
        "SUPER_ADMIN",
        "COMPANY_ADMIN",
        "HR",
        "MANAGER",
        "EMPLOYEE"
      ),
      allowNull: false,
      defaultValue: "EMPLOYEE",
    },

    status: {
      type: DataTypes.ENUM(
        "ACTIVE",
        "INACTIVE",
        "SUSPENDED"
      ),
      allowNull: false,
      defaultValue: "ACTIVE",
    },

    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;