const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const SECRET_KEY = process.env.AUTH_SECRET_KEY;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
    //minLength: [6, "Password must be atleast 6 characters long"],
  },
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: Number,
  active: { type: Boolean, default: true }, // Soft-Delete
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
});

userSchema.statics.findActive = function () {
  return this.find({ active: true });
};

userSchema.statics.findActiveById = function (id) {
  return this.find({ _id: id, active: true });
};

userSchema.methods.signUp = async function () {
  let user = this;
  user.name = user.firstname + " " + user.lastname;
  user.password = await bcrypt.hash(user.password, saltRounds);
  return user.save();
};

userSchema.statics.signIn = async function (email, password) {
  const user = await User.findOne({ email: email }, [
    "email",
    "name",
    "password",
  ]);

  console.log("user", user);

  if (user) {
    const result = await bcrypt.compare(password, user.password);
    console.log(result);
    if (result === true) {
      const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { email: user.email, name: user.name, token: token };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
