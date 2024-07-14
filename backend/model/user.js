// importing the mongoose.
const mongoose = require("mongoose");

// importing the review.
const Book = require("./book.js");

const schema = mongoose.Schema;

const userSchema = new schema({
    userName: {
        type: String,
        unique: true,
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
        unique: true,
        required: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "LIBRARIAN", "USER"],
        default: "USER",
        required: true,
    },
    borrowedBooks: [{
        type: schema.Types.ObjectId,
        ref: "book"
    },
    ],
});

// creating the collection.
const User = mongoose.model("User", userSchema);

module.exports = User;