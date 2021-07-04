const { check, body, validationResult } = require("express-validator");
const checkValidationErrors = require("../helpers/checkValidationErrors");
const User = require("../models/User");

const userCreationValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email. please provide a valid one."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum of 6 in length"),
  check("email").custom(async (value) => {
    try {
      const user = await User.findOne({ email: value });
      console.log(user);
      if (user) return Promise.reject("User already exists");
    } catch (err) {
      console.log(err);
      return;
    }
    return true;
  }),
  checkValidationErrors,
];

module.exports = userCreationValidator;
