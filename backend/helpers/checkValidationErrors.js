const { validationResult } = require("express-validator");
const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessagesList = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessagesList });
  }
  next();
};

module.exports = checkValidationErrors;
