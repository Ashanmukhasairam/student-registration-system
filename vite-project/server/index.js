// server/index.js
const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://zerodha-clone:@wanderlust.18okj.mongodb.net/?retryWrites=true&w=majority&appName=wanderlust', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


// Routes
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
