export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user.role) {
      return res.status(403).json({
        message: "Role not found",
      });
    }

    // allowedRoles = ["admin", "teacher"];

    // const isPresent = allowedRoles.includes
    console.log(req.user.role);
    console.log(allowedRoles.includes(req.user.role));

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Permission not granted",
      });
    }
    next()
  };
};
