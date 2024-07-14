const { Router } = require('express');
const router = Router();

// routes imported
const userRoutes = require('./user.js');
const booksRoutes = require("./book.js");

router.use('/user', userRoutes); // v1/user/...
router.use("/book", booksRoutes); // v1/book/...

module.exports = router;