const authorize = (
  ...allowedRoles
) => {
  return (
    req,
    res,
    next
  ) => {

    /* =========================================
       AUTHENTICATION CHECK
    ========================================= */

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }


    /* =========================================
       ROLE CHECK
    ========================================= */

    if (
      !allowedRoles.includes(
        req.user.userType
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to access this resource",
      });
    }


    next();
  };
};


module.exports = {
  authorize,
};