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
    default:
      "https://res.cloudinary.com/dibsgcq9a/image/upload/v1716750907/book-world/sfx9lfhbj3pkxy0esxkk.jpg",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
