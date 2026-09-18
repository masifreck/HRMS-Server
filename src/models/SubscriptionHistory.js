const {
  DataTypes,
} = require("sequelize");

const {
  sequelize,
} = require("../config/database");

const SubscriptionHistory =
  sequelize.define(
    "SubscriptionHistory",
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

      subscriptionId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      action: {
        type: DataTypes.ENUM(
          "CREATED",
          "UPGRADED",
          "DOWNGRADED",
          "EXTENDED",
          "PAUSED",
          "RESUMED",
          "RENEWED",
          "CANCELLED",
          "EXPIRED",
          "PLAN_CHANGED",
          "LIMIT_CHANGED"
        ),
        allowNull: false,
      },

      oldPlanId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      newPlanId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      oldStatus: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      newStatus: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      oldEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      newEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      changedBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "subscription_history",
    }
  );

module.exports =
  SubscriptionHistory;