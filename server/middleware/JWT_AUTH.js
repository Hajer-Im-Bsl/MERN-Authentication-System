const jwt = require("jsonwebtoken");

const JWT_AUTH = async (req, res, next) => {
  try {
    //? get the token
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "JWT not provided" });
    }
    //? verify token content
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    req.user_id = decodedToken.id;
    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid token" });
  }
};
module.exports = JWT_AUTH;
