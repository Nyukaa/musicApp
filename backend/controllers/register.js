const bcrypt = require("bcrypt");
const registerRouter = require("express").Router();
const User = require("../models/user");

// POST /api/register
registerRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password must be at least 3 characters" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json({ id: savedUser._id, username: savedUser.username });
});

module.exports = registerRouter;
