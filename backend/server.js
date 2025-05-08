// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/stealthtaskmanagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
