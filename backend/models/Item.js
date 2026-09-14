const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["Lost", "Found"],
        required: true
    },

    location: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;