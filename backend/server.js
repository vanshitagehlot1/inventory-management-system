require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Item Schema
const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

const Item = mongoose.model("Item", ItemSchema);

// Create Item
app.post("/items", async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
});

// Read Items
app.get("/items", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Update Item
app.put("/items/:id", async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
});

// Delete Item
app.delete("/items/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));