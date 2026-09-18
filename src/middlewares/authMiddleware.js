const jwt = require("jsonwebtoken");

const {
  User,
  Role,
  Company,
} = require("../models");


const authenticate = async (
  req,
  res,
  next
) => {
  try {
    /* =========================================
       GET AUTHORIZATION HEADER
    ========================================= */

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token is required",
      });
    }


    /* =========================================
       GET TOKEN
    ========================================= */

    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token is required",
      });
    }


    /* =========================================
       VERIFY JWT
    ========================================= */

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    /* =========================================
       FIND USER
    ========================================= */

    const user =
      await User.findByPk(
        decoded.userId,
        {
          attributes: {
            exclude: ["password"],
          },

          include: [
            {
              model: Role,
              as: "role",
              attributes: [
                "id",
                "name",
                "code",
              ],
            },

            {
              model: Company,
              as: "company",
              required: false,

              attributes: [
                "id",
                "companyCode",
                "companyName",
                "status",
              ],
            },
          ],
        }
      );


    /* =========================================
       USER NOT FOUND
    ========================================= */

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User no longer exists",
      });
    }


    /* =========================================
       USER STATUS
    ========================================= */

    if (
      user.status !== "ACTIVE"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "User account is not active",
      });
    }


    /* =========================================
       COMPANY STATUS
       
       SUPER_ADMIN:
       companyId = null

       COMPANY_ADMIN:
       companyId = company ID
    ========================================= */

    if (
      user.companyId &&
      user.company
    ) {
      if (
        user.company.status !==
        "ACTIVE"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Company is not active",
        });
      }
    }


    /* =========================================
       ATTACH USER TO REQUEST
    ========================================= */

    req.user = user;


    /*
     * IMPORTANT
     *
     * Never take companyId from:
     *
     * req.body.companyId
     * req.query.companyId
     * req.params.companyId
     *
     * For tenant APIs we will use:
     *
     * req.companyId
     *
     * which comes from the authenticated
     * user's database record.
     */

    req.companyId =
      user.companyId || null;


    next();

  } catch (error) {

    /* =========================================
       TOKEN EXPIRED
    ========================================= */

    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token has expired",
      });
    }


    /* =========================================
       INVALID TOKEN
    ========================================= */

    if (
      error.name ===
      "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication token",
      });
    }


    console.error(
      "Authentication Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Authentication failed",
    });
  }
};


module.exports = {
  authenticate,
};