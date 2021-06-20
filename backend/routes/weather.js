const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const city = req.query.city;

  //if (city === null || city === undefined || city === "") {
  if (!city) {
    return res.status(400).send("Please provide city.");
  }

  try {
    const url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=6195b3e14e9b8abc362ce243d2df7105";
    const result = await axios.get(url);
    res.status(200).send(result.data);
  } catch (err) {
    const errData = err.response.data;
    if (errData.cod === "404") {
      res.status(404).send(errData.message);
    } else {
      res.status(500).send("Something went wrong!");
    }
  }
});

module.exports = router;
