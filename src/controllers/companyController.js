const {
  Company,
  User,
  Role,
  Subscription,
  SubscriptionPlan,
} = require("../models");

const {
  hashPassword,
} = require("../utils/password");


/*
=========================================================
CREATE COMPANY
POST /api/super-admin/companies
=========================================================
*/

const createCompany = async (req, res) => {
  try {
    const {
      companyCode,
      companyName,
      legalName,
      email,
      phone,
      address,
      city,
      state,
      country,
      employeeLimit,
      storageLimitMb,
    } = req.body;

    /* -----------------------------------------
       Validation
    ----------------------------------------- */

    if (!companyCode || !companyName) {
      return res.status(400).json({
        success: false,
        message:
          "Company code and company name are required",
      });
    }

    const normalizedCode =
      companyCode.trim().toUpperCase();

    /* -----------------------------------------
       Check duplicate company code
    ----------------------------------------- */

    const existingCompany =
      await Company.findOne({
        where: {
          companyCode: normalizedCode,
        },
      });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message:
          "Company code already exists",
      });
    }

    /* -----------------------------------------
       Create company
    ----------------------------------------- */

    const company =
      await Company.create({
        companyCode: normalizedCode,

        companyName:
          companyName.trim(),

        legalName:
          legalName?.trim() || null,

        email:
          email?.trim() || null,

        phone:
          phone?.trim() || null,

        address:
          address?.trim() || null,

        city:
          city?.trim() || null,

        state:
          state?.trim() || null,

        country:
          country?.trim() || "India",

        status: "ACTIVE",

        employeeLimit:
          Number(employeeLimit) || 10,

        storageLimitMb:
          Number(storageLimitMb) || 1024,

        createdBy:
          req.user.id,
      });

    return res.status(201).json({
      success: true,
      message:
        "Company created successfully",

      data: {
        company,
      },
    });
  } catch (error) {
    console.error(
      "Create Company Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create company",
    });
  }
};


/*
=========================================================
GET ALL COMPANIES
GET /api/super-admin/companies
=========================================================
*/

const getCompanies = async (req, res) => {
  try {
    const companies =
      await Company.findAll({
        order: [
          ["createdAt", "DESC"],
        ],

        include: [
          {
            model: User,
            as: "users",
            attributes: [
              "id",
              "username",
              "firstName",
              "lastName",
              "userType",
              "status",
              "lastLoginAt",
            ],
          },

          {
            model: Subscription,
            as: "subscriptions",
            required: false,

            include: [
              {
                model: SubscriptionPlan,
                as: "plan",
                attributes: [
                  "id",
                  "name",
                  "code",
                  "price",
                  "billingCycle",
                ],
              },
            ],
          },
        ],
      });

    return res.status(200).json({
      success: true,
      message:
        "Companies fetched successfully",

      data: companies,
    });
  } catch (error) {
    console.error(
      "Get Companies Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch companies",
    });
  }
};


/*
=========================================================
GET COMPANY BY ID
GET /api/super-admin/companies/:id
=========================================================
*/

const getCompanyById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const company =
      await Company.findByPk(id, {
        include: [
          {
            model: User,
            as: "users",
            attributes: [
              "id",
              "username",
              "email",
              "firstName",
              "lastName",
              "userType",
              "status",
              "lastLoginAt",
            ],
          },

          {
            model: Subscription,
            as: "subscriptions",
            required: false,

            include: [
              {
                model: SubscriptionPlan,
                as: "plan",
              },
            ],
          },
        ],
      });

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Company fetched successfully",

      data: {
        company,
      },
    });
  } catch (error) {
    console.error(
      "Get Company Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch company",
    });
  }
};


/*
=========================================================
UPDATE COMPANY
PUT /api/super-admin/companies/:id
=========================================================
*/

const updateCompany = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const company =
      await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    const {
      companyName,
      legalName,
      email,
      phone,
      address,
      city,
      state,
      country,
      employeeLimit,
      storageLimitMb,
    } = req.body;

    await company.update({
      companyName:
        companyName !== undefined
          ? companyName.trim()
          : company.companyName,

      legalName:
        legalName !== undefined
          ? legalName?.trim() || null
          : company.legalName,

      email:
        email !== undefined
          ? email?.trim() || null
          : company.email,

      phone:
        phone !== undefined
          ? phone?.trim() || null
          : company.phone,

      address:
        address !== undefined
          ? address?.trim() || null
          : company.address,

      city:
        city !== undefined
          ? city?.trim() || null
          : company.city,

      state:
        state !== undefined
          ? state?.trim() || null
          : company.state,

      country:
        country !== undefined
          ? country?.trim() || "India"
          : company.country,

      employeeLimit:
        employeeLimit !== undefined
          ? Number(employeeLimit)
          : company.employeeLimit,

      storageLimitMb:
        storageLimitMb !== undefined
          ? Number(storageLimitMb)
          : company.storageLimitMb,
    });

    return res.status(200).json({
      success: true,
      message:
        "Company updated successfully",

      data: {
        company,
      },
    });
  } catch (error) {
    console.error(
      "Update Company Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update company",
    });
  }
};


/*
=========================================================
ACTIVATE COMPANY
PATCH /api/super-admin/companies/:id/activate
=========================================================
*/

const activateCompany = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const company =
      await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    await company.update({
      status: "ACTIVE",
    });

    return res.status(200).json({
      success: true,
      message:
        "Company activated successfully",

      data: {
        company,
      },
    });
  } catch (error) {
    console.error(
      "Activate Company Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to activate company",
    });
  }
};


/*
=========================================================
SUSPEND COMPANY
PATCH /api/super-admin/companies/:id/suspend
=========================================================
*/

const suspendCompany = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const company =
      await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    await company.update({
      status: "SUSPENDED",
    });

    return res.status(200).json({
      success: true,
      message:
        "Company suspended successfully",

      data: {
        company,
      },
    });
  } catch (error) {
    console.error(
      "Suspend Company Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to suspend company",
    });
  }
};


/*
=========================================================
CREATE COMPANY ADMIN
POST /api/super-admin/companies/:id/admin
=========================================================
*/

const createCompanyAdmin =
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        username,
        email,
        firstName,
        lastName,
        password,
      } = req.body;


      /* -----------------------------------------
         Company
      ----------------------------------------- */

      const company =
        await Company.findByPk(id);

      if (!company) {
        return res.status(404).json({
          success: false,
          message:
            "Company not found",
        });
      }


      /* -----------------------------------------
         Required fields
      ----------------------------------------- */

      if (
        !username ||
        !firstName ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Username, first name and password are required",
        });
      }


      /* -----------------------------------------
         Check username
      ----------------------------------------- */

      const existingUser =
        await User.findOne({
          where: {
            username:
              username.trim(),
          },
        });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message:
            "Username already exists",
        });
      }


      /* -----------------------------------------
         Role
      ----------------------------------------- */

      const role =
        await Role.findOne({
          where: {
            code:
              "COMPANY_ADMIN",
          },
        });

      if (!role) {
        return res.status(500).json({
          success: false,
          message:
            "COMPANY_ADMIN role has not been configured",
        });
      }


      /* -----------------------------------------
         Admin limit
      ----------------------------------------- */

      const adminCount =
        await User.count({
          where: {
            companyId: company.id,
            userType:
              "COMPANY_ADMIN",
          },
        });


      /*
       * We will later replace this
       * with the active subscription
       * limit.
       *
       * For now the company record
       * has a default limit.
       */

      if (
        adminCount >= 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Company admin limit reached",
        });
      }


      /* -----------------------------------------
         Hash password
      ----------------------------------------- */

      const hashedPassword =
        await hashPassword(
          password
        );


      /* -----------------------------------------
         Create Admin
      ----------------------------------------- */

      const admin =
        await User.create({
          username:
            username.trim(),

          email:
            email?.trim() || null,

          password:
            hashedPassword,

          firstName:
            firstName.trim(),

          lastName:
            lastName?.trim() || null,

          companyId:
            company.id,

          roleId:
            role.id,

          userType:
            "COMPANY_ADMIN",

          status:
            "ACTIVE",
        });


      return res.status(201).json({
        success: true,
        message:
          "Company admin created successfully",

        data: {
          admin: {
            id: admin.id,
            username:
              admin.username,
            email:
              admin.email,
            firstName:
              admin.firstName,
            lastName:
              admin.lastName,
            companyId:
              admin.companyId,
            userType:
              admin.userType,
            status:
              admin.status,
          },
        },
      });
    } catch (error) {
      console.error(
        "Create Company Admin Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to create company admin",
      });
    }
  };


module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  activateCompany,
  suspendCompany,
  createCompanyAdmin,
};