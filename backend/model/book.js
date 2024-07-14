const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
  },
  author: {
    type: String,
    minlength: 3,
  },
  publisher: {
    type: String,
    minLength: 3,
  },
  publishedYear: {
    type: String,
  },
  categories: [
    {
      type: String,
    },
  ],
  quantities: {
    type: Number,
    default: 1,
  },
  description: String,
  image_url: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
