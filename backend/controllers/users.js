const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 3) {
    return res.status(400).json({
      error: "password must be at least 3 characters",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
