require("dotenv").config();

const {
  sequelize,
  Role,
  User,
} = require("../models");

const {
  hashPassword,
} = require("../utils/password");


const seedRoles =
  async () => {

    const roles = [
      {
        name:
          "Super Administrator",

        code:
          "SUPER_ADMIN",

        description:
          "Platform level administrator",

        isSystemRole:
          true,

        status:
          true,
      },

      {
        name:
          "Company Administrator",

        code:
          "COMPANY_ADMIN",

        description:
          "Administrator of a subscribing company",

        isSystemRole:
          true,

        status:
          true,
      },

      {
        name:
          "HR Manager",

        code:
          "HR",

        description:
          "Human resources manager",

        isSystemRole:
          true,

        status:
          true,
      },

      {
        name:
          "Manager",

        code:
          "MANAGER",

        description:
          "Department or team manager",

        isSystemRole:
          true,

        status:
          true,
      },

      {
        name:
          "Employee",

        code:
          "EMPLOYEE",

        description:
          "Standard employee",

        isSystemRole:
          true,

        status:
          true,
      },
    ];


    for (
      const roleData of roles
    ) {

      const [role, created] =
        await Role.findOrCreate({
          where: {
            code:
              roleData.code,
          },

          defaults:
            roleData,
        });


      if (created) {
        console.log(
          `✅ Role created: ${roleData.code}`
        );
      } else {
        console.log(
          `ℹ️ Role exists: ${roleData.code}`
        );
      }
    }
  };


const seedSuperAdmin =
  async () => {

    try {

      await sequelize.authenticate();

      console.log(
        "✅ Database connected"
      );


      await seedRoles();


      const role =
        await Role.findOne({
          where: {
            code:
              "SUPER_ADMIN",
          },
        });


      const username =
        process.env
          .SUPER_ADMIN_USERNAME ||
        "superadmin";


      const existingUser =
        await User.findOne({
          where: {
            username,
          },
        });


      if (existingUser) {

        console.log(
          `ℹ️ Super Admin "${username}" already exists`
        );

        process.exit(0);
      }


      const password =
        process.env
          .SUPER_ADMIN_PASSWORD ||
        "ChangeMe@123";


      const hashedPassword =
        await hashPassword(
          password
        );


      await User.create({
        username,

        email:
          "admin@hrms.local",

        password:
          hashedPassword,

        firstName:
          "Super",

        lastName:
          "Admin",

        companyId:
          null,

        roleId:
          role.id,

        userType:
          "SUPER_ADMIN",

        status:
          "ACTIVE",
      });


      console.log(
        "======================================"
      );

      console.log(
        "✅ SUPER ADMIN CREATED"
      );

      console.log(
        "======================================"
      );

      console.log(
        `Username: ${username}`
      );

      console.log(
        "Password: [configured in .env]"
      );

      console.log(
        "======================================"
      );


      process.exit(0);

    } catch (error) {

      console.error(
        "❌ Seeder failed:",
        error
      );

      process.exit(1);
    }
  };


seedSuperAdmin();