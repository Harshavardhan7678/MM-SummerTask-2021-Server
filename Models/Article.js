const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    overline: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
