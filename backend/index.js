const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const axios = require("axios");

const todosRouter = require("./routes/todos");
const weatherRouter = require("./routes/weather");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://george:Pass123@cluster0.zehn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/todos", todosRouter);
app.use("/weather", weatherRouter);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.listen(3000);
