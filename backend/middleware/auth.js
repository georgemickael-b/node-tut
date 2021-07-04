const User = require("../models/User");
const SECRET_KEY = process.env.AUTH_SECRET_KEY;
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    let authHeaderValue = req.headers["authorization"];
    const token = authHeaderValue.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userEmail = decodedToken.email;
    const user = await User.findOne({ email: userEmail });
    req.user = user;
    next();
  } catch (err) {
    //console.log(err);
    res.status(403).send({ message: "You are not logged in." });
  }
}

module.exports = auth;
