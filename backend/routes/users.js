const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.findActive();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: "Something went wrong." });
  }
});

router.get("/:userId", async (req, res) => {
  const data = req.params;
  try {
    //const user = await User.findOne({_id:data.userId })
    const user = await User.findActiveById(data.userId);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "User not found" });
  }
});

router.post("/", async (req, res) => {
  // email , password, firstname , last, age
  const data = req.body;
  const user = new User({
    email: data.email,
    password: data.password,
    firstname: data.firstname,
    lastname: data.lastname,
    age: data.age,
    gender: data.gender,
  });

  try {
    await user.saveCustom();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    let message = err.message;
    if (err.code === 11000) {
      message = "Email is already registered.";
    }
    res.status(500).send({ message: message });
  }
});

module.exports = router;
