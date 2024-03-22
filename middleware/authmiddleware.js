const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden - Invalid token', msg: err });
    }
    req.user = user;
    next();
  });
};
