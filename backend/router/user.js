const express = require("express");

// const { JWT_SECRET } = require("../");

// const bcrypt = require("bcryptjs");

// const jwt = require("jsonwebtoken");

const User = require("../model/user");
const { authorization } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authorization, async (req, res) => {
  let user = await User.findById(req.body.userId, "-password");

  res.json({
    user,
  });
});

module.exports = router;
