const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    OTP_VerificationToken: {
      OTP: String,
      expires: Date,
    },
    VerificationToken: {
      token: String,
      expires: Date,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
