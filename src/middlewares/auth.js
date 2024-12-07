const adminAuth = (req, res, next) => {
  const token = "toksen";
  const isAdminAuthorized = token === "token";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
