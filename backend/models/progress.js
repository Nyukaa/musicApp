const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  completedSongs: [
    {
      type: String, // song file name
    },
  ],
  completedExercises: [
    {
      type: String, // exercise file name
    },
  ],
});

module.exports = mongoose.model("Progress", progressSchema);
