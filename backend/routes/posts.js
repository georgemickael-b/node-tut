const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const data = req.body;
  const post = new Post({
    text: data.text,
    author: data.author, // This will change
  });

  try {
    await post.save();
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    //const posts = await Post.find().populate("author", "name");
    //const posts = await Post.find().populate("author", ["name", "email"]);
    //const posts = await Post.find().populate("author", "-password");
    const posts = await Post.find().populate("author", ["name", "email"]);
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
