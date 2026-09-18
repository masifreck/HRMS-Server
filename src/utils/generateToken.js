const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      companyId: user.companyId,
      roleId: user.roleId,
      userType: user.userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN ||
        "1d",
    }
  );
};

module.exports = generateToken;