const mongoose = require("mongoose");

// importing the review.
const Book = require("./book.js");

const schema = mongoose.Schema;

const userSchema = new schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "librarian", "user"],
    default: "user",
    required: true,
  },
  borrowedBooks: [
    {
      type: schema.Types.ObjectId,
      ref: "book",
    },
  ],
  log: [
    {
      bookId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: "Book",
      },
      borowdDate: {
        type: Date,
        default: Date.now(),
      },
      returnDate: {
        type: Date,
        default: null,
      },
      dueDate: {
        type: Date,
        default: Date.now() + 7,
      },
      penalty: {
        type: Number,
        default: 0,
      },
    },
  ],
});

// creating the collection.
const User = mongoose.model("User", userSchema);

module.exports = User;
