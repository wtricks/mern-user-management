const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    role: { type: String, default: "user" }, // admin, user
    active: { type: Number, default: 0 }, // 0 -> deactive, 1 -> active, 2 -> disabled

    lastLogin: { type: Date, default: null },
    loginIp: { type: String, default: "" },

    // password reset token
    token: { type: String, default: "" },
    tokenExp: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// remove password, token, tokenExp from response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokenExp;
  delete user.token;
  
  return user;
};

const User = mongoose.model("User", userSchema);
export default User
