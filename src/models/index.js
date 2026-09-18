const {
  sequelize,
} = require("../config/database");

const Company =
  require("./Company");

const User =
  require("./User");

const Role =
  require("./Role");

const Permission =
  require("./Permission");

const SubscriptionPlan =
  require("./SubscriptionPlan");

const Subscription =
  require("./Subscription");

const SubscriptionHistory =
  require("./SubscriptionHistory");


/* =========================================================
   COMPANY → USERS
========================================================= */

Company.hasMany(User, {
  foreignKey: "companyId",
  as: "users",
});

User.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company",
});


/* =========================================================
   ROLE → USERS
========================================================= */

Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});


/* =========================================================
   COMPANY → SUBSCRIPTIONS
========================================================= */

Company.hasMany(Subscription, {
  foreignKey: "companyId",
  as: "subscriptions",
});

Subscription.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company",
});


/* =========================================================
   PLAN → SUBSCRIPTIONS
========================================================= */

SubscriptionPlan.hasMany(
  Subscription,
  {
    foreignKey: "planId",
    as: "subscriptions",
  }
);

Subscription.belongsTo(
  SubscriptionPlan,
  {
    foreignKey: "planId",
    as: "plan",
  }
);


/* =========================================================
   SUBSCRIPTION → HISTORY
========================================================= */

Subscription.hasMany(
  SubscriptionHistory,
  {
    foreignKey: "subscriptionId",
    as: "history",
  }
);

SubscriptionHistory.belongsTo(
  Subscription,
  {
    foreignKey: "subscriptionId",
    as: "subscription",
  }
);


/* =========================================================
   COMPANY → SUBSCRIPTION HISTORY
========================================================= */

Company.hasMany(
  SubscriptionHistory,
  {
    foreignKey: "companyId",
    as: "subscriptionHistory",
  }
);

SubscriptionHistory.belongsTo(
  Company,
  {
    foreignKey: "companyId",
    as: "company",
  }
);


/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  sequelize,
  Company,
  User,
  Role,
  Permission,
  SubscriptionPlan,
  Subscription,
  SubscriptionHistory,
};