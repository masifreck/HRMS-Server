const express =
  require("express");

const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  activateCompany,
  suspendCompany,
  createCompanyAdmin,
} = require(
  "../controllers/companyController"
);

const {
  authenticate,
} = require(
  "../middlewares/authMiddleware"
);

const {
  authorize,
} = require(
  "../middlewares/roleMiddleware"
);


const router =
  express.Router();


/*
=========================================================
ALL ROUTES BELOW REQUIRE:
1. Valid JWT
2. SUPER_ADMIN
=========================================================
*/

router.use(
  authenticate,
  authorize("SUPER_ADMIN")
);


/*
=========================================================
COMPANIES
=========================================================
*/

router.post(
  "/",
  createCompany
);

router.get(
  "/",
  getCompanies
);

router.get(
  "/:id",
  getCompanyById
);

router.put(
  "/:id",
  updateCompany
);


/*
=========================================================
COMPANY STATUS
=========================================================
*/

router.patch(
  "/:id/activate",
  activateCompany
);

router.patch(
  "/:id/suspend",
  suspendCompany
);


/*
=========================================================
COMPANY ADMIN
=========================================================
*/

router.post(
  "/:id/admin",
  createCompanyAdmin
);


module.exports =
  router;