const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("Route user");
  res.send("<p>The middleware that handles just/users</p>");
});
app.use("/", (req, res, next) => {
  console.log("Route default");
  res.send("<p>The middleware that handles just</p>");
});

app.listen(3001);
