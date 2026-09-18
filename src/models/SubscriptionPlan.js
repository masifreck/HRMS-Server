const {
  DataTypes,
} = require("sequelize");

const {
  sequelize,
} = require("../config/database");

const SubscriptionPlan = sequelize.define(
  "SubscriptionPlan",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    billingCycle: {
      type: DataTypes.ENUM(
        "MONTHLY",
        "QUARTERLY",
        "YEARLY",
        "CUSTOM"
      ),
      allowNull: false,
      defaultValue: "MONTHLY",
    },

    maxEmployees: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 10,
    },

    maxAdmins: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },

    storageLimitMb: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1024,
    },

    features: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "subscription_plans",
  }
);

module.exports = SubscriptionPlan;