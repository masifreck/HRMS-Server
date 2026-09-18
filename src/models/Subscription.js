const {
  DataTypes,
} = require("sequelize");

const {
  sequelize,
} = require("../config/database");

const Subscription = sequelize.define(
  "Subscription",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    companyId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    planId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "TRIAL",
        "ACTIVE",
        "PAUSED",
        "EXPIRED",
        "CANCELLED"
      ),
      allowNull: false,
      defaultValue: "TRIAL",
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    maxEmployees: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    maxAdmins: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    storageLimitMb: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    autoRenew: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    pausedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "subscriptions",
  }
);

module.exports = Subscription;