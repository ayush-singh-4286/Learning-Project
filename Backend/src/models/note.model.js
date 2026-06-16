const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false } // <-- THIS MUST BE HERE!
});

module.exports = mongoose.model("Note", noteSchema);