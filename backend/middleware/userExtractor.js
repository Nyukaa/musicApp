const jwt = require("jsonwebtoken");

const userExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
    } catch (error) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    req.user = null;
  }

  next();
};

module.exports = userExtractor;
