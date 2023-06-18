const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, " name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, " email is required"],
      unique: true,
      lowercase: true,
    },
    phone: String,

    profileImg: String,
    password: {
      type: String,
      required: [true, " password is required"],
      minLength: [6, "password is too short"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
