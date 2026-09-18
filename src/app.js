const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const companyRoutes =
  require("./routes/companyRoutes");

const app = express();


/* =========================================================
   SECURITY
========================================================= */

app.use(helmet());


/* =========================================================
   CORS
========================================================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


/* =========================================================
   BODY PARSER
========================================================= */

app.use(
  express.json({
    limit: "2mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  })
);


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "HRMS backend is running",
      timestamp:
        new Date().toISOString(),
    });
  }
);


/* =========================================================
   404
========================================================= */

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message: "API route not found",
    });
  }
);


/* =========================================================
   ERROR HANDLER
========================================================= */

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "Server Error:",
      error
    );

    res.status(
      error.status || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Internal server error",
      ...(process.env.NODE_ENV ===
      "development"
        ? {
            stack:
              error.stack,
          }
        : {}),
    });
  }
);

app.use(
  "/api/super-admin/companies",
  companyRoutes
);

module.exports = app;