const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // accepting token only via headers
  const token = req.headers["x-access-token"];

  // if token is not present
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    // verifying the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
};

module.exports = verifyToken;
