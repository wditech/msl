const jwt = require("jsonwebtoken");
const utility = require("../helpers/utility.helpers");

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return utility.resMessage(res, 401, false, "Access denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    utility.resMessage(res, 400, false, error);
  }
};

module.exports = verifyToken;
