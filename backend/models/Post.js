const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
