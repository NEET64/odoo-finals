const { Router } = require('express');
const router = Router();

// routes imported
const userRoutes = require('./user.js');
// const booksRoutes = require("./book.js");

router.use('/user', userRoutes); // api/user/...
// router.use("/book", booksRoutes); // api/books/...

module.exports = router;