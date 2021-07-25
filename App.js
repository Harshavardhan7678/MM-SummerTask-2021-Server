const express = require("express");
const mongoose = require("mongoose");
const Article = require("./Models/Article");

// express app
const app = express();
app.use(express.json());

// Connect to Mongodb
const dbURI =
  "mongodb+srv://Nightfury:Srinudevi7678@blogpage.4f6n4.mongodb.net/Blog-Page?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000, () => console.log("Server Started")))
  .catch((err) => console.log(err));

app.get("/add-article", (req, res) => {
  const article = new Article({
    overline: "March 31, 2021",
    heading: "What happened in Thailand?",
    body: "Kayaks crowd Three Sisters Springs, where people and manatees maintain controversial coexistence.",
  });

  article
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/articles", (req, res) => {
//   res.render("create", { title: "Create a new blog" });
// });

app.get("/article", (req, res) => {
  Article.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/article/:id", (req, res) => {
  const id = req.params.id;

  Article.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/article/:id", (req, res) => {
  const id = req.params.id;

  Article.findByIdAndDelete(id)
    .then((result) => {
      res.send(`${id} deleted`);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/article", (req, res) => {
  const article = new Article(req.body);

  article
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/article/:id", (req, res) => {
  const id = req.params.id;
  const about = req.body;

  Article.findByIdAndUpdate(id, about, { new: true })
    .then((result) => {
      res.send("Update");
    })
    .catch((err) => {
      console.log(err);
    });
});

async function getArticle(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id);

    if (article == null) {
      return res.status(404).json({ message: "Can't find Article" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  req.article = article;
  next();
}

// app.get("/articles", (req, res) => {
//   Article.find()
//     .sort({ createdAt: -1 })
//     .then((result) => {
//       res.render("index", { article: result, title: "All articles" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
