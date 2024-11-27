const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Bug = require("./models/Bug");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/bugreporter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Get all bugs
app.get("/api/bugs", async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bugs" });
  }
});

// Create a new bug
app.post("/api/bugs", async (req, res) => {
  const { title, description } = req.body;
  const bug = new Bug({ title, description });

  try {
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    res.status(400).json({ message: "Error creating bug" });
  }
});

// Delete a bug by ID
app.delete("/api/bugs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bug = await Bug.findByIdAndDelete(id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    res.json({ message: "Bug deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bug" });
  }
});

// Update a bug status to resolved
app.put("/api/bugs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bug = await Bug.findByIdAndUpdate(id, { status: "resolved" }, { new: true });
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Error updating bug status" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
