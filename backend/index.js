require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ connected to MongoDB");
    app.listen(3001, () => console.log("🚀 Server running on port 3001"));
  })
  .catch((error) => {
    console.error("❌ error connecting to MongoDB:", error.message);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
