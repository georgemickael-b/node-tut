const mongoose = require("mongoose");

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
    minLength: [6, "Password must be atleast 6 characters long"],
    validate: {
      validator: function (v) {
        return /^(?=.*\d)[a-zA-Z\d]{6,13}$/.test(v);
        /*
        for (let c of v) {
          if (!isNaN(c)) {
            return true;
          }
        }
        return false;
        */
      },
      message: function (props) {
        return "Password should atleast have one number";
      },
    },
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

userSchema.methods.saveCustom = function () {
  let user = this;
  user.name = user.firstname + " " + user.lastname;
  return user.save();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
