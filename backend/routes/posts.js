const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const data = req.body;
  const post = new Post({
    text: data.text,
    author: req.user._id,
  });

  try {
    await post.save();
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().populate("author", ["name", "email"]);
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
