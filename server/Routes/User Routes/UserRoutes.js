const {
  register,
  login,
  verifyUser,
  resendVerification,
  updateUser,
  forgotPassword,
  verifyPasswordOTP,
  getUser,
} = require("../../Controllers/UserController");
const JWT_AUTH = require("../../middleware/JWT_AUTH");
const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.post("/resetPassword", forgotPassword);
UserRoutes.get("/verify/:token", verifyUser);
UserRoutes.get("/resendVerification/:token", resendVerification);
UserRoutes.get("/verifyPasswordToken/:OTP", verifyPasswordOTP);

//? this one endpoint is for auth middleware testing purposes
UserRoutes.put("/update", JWT_AUTH, updateUser);
UserRoutes.get("/", JWT_AUTH, getUser);
module.exports = UserRoutes;
