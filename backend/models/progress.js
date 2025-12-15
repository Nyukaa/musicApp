const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedSongs: [
    {
      file: String, // file name of song/exercise
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Progress", progressSchema);
