const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Item = require("./models/Item");

const wrapAsync = require("./middleware/wrapAsync");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// MONGODB CONNECTION
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });


// HOME ROUTE
app.get("/", (req, res) => {
    res.send("Campus Lost & Found API is running!");
});


// GET ALL ITEMS
app.get("/api/items", wrapAsync(async (req, res) => {
    const items = await Item.find()
        .sort({ createdAt: -1 });

    res.json(items);
}));


// ADD ITEM
app.post("/api/items", wrapAsync(async (req, res, next) => {

    const {
        name,
        type,
        location,
        date,
        email,
        description
    } = req.body || {};


    // Server-side validation
    if (!name || !type || !location || !date || !email || !description) {

        const error = new Error("All fields are required");

        error.statusCode = 400;

        return next(error);
    }


    // Create item
    const newItem = await Item.create({
        name,
        type,
        location,
        date,
        email,
        description
    });


    res.status(201).json({
        success: true,
        message: "Item added successfully",
        item: newItem
    });

}));


// DELETE ITEM
app.delete("/api/items/:id", wrapAsync(async (req, res, next) => {

    const deletedItem =
        await Item.findByIdAndDelete(req.params.id);


    if (!deletedItem) {

        const error = new Error("Item not found");

        error.statusCode = 404;

        return next(error);
    }


    res.json({
        success: true,
        message: "Item deleted successfully"
    });

}));


// GLOBAL ERROR HANDLER
app.use(errorHandler);


// START SERVER
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});