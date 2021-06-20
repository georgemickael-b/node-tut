const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const result = await axios.get("http://jsonplaceholder.typicode.com/todos");
    res.status(200).send({ todos: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
