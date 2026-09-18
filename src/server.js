require("dotenv").config();

const app =
  require("./app");

const {
  connectDatabase,
  sequelize,
} = require("./config/database");

require("./models");


const PORT =
  process.env.PORT || 5000;


const startServer =
  async () => {
    try {

      await connectDatabase();

      /*
       * Development only.
       *
       * Later we will replace this with
       * proper Sequelize migrations.
       */
      await sequelize.sync();

      console.log(
        "✅ Database models synchronized"
      );

      app.listen(
        PORT,
        () => {
          console.log(
            `🚀 HRMS backend running on port ${PORT}`
          );

          console.log(
            `http://localhost:${PORT}/api/health`
          );
        }
      );

    } catch (error) {

      console.error(
        "❌ Failed to start server:",
        error
      );

      process.exit(1);
    }
  };


startServer();