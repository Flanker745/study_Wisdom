const JWT = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;
// Middleware to verify JWT token
// JWT verification middleware
const verifyJWT = (req, res, next) => {
    let auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ msg: "Please Login Properly!", status: false });
    }
    auth = auth.split(" ")[1];
    JWT.verify(auth, jwtKey, (err, decode) => {
      if (err) {
        return res.status(403).json({ msg: "Something went wrong", status: false  });
      }
      req.user = decode.user;
      next();
    });
  };

module.exports = { verifyJWT };
