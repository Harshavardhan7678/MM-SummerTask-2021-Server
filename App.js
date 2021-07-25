const express = require("express");
const mongoose = require("mongoose");

// express app
const app = express();

// Connect to Mongodb
const dbURI =
  "mongodb+srv://Nightfury:Srinudevi7678@blogpage.4f6n4.mongodb.net/Blog-Page?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000, () => console.log("Server Started")))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // res.send('<p>home page</p>');
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send('<p>about page</p>');
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
