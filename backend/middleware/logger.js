function logger(req, res, next) {
  console.log("I am logging");
  next();
}

module.exports = logger;
