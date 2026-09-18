const {
  DataTypes,
} = require("sequelize");

const {
  sequelize,
} = require("../config/database");

const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    companyCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    companyName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    legalName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "India",
    },

    status: {
      type: DataTypes.ENUM(
        "ACTIVE",
        "SUSPENDED",
        "INACTIVE"
      ),
      allowNull: false,
      defaultValue: "ACTIVE",
    },

    employeeLimit: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 10,
    },

    storageLimitMb: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1024,
    },

    createdBy: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: "companies",
  }
);

module.exports = Company;