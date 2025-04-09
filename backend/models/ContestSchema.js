const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema({
     // Unique contest ID (from platform)
    platform: { type: String, required: true },
    contestName: { type: String, required: true },
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // In hours
    contestUrl: { type: String, required: true }
});

module.exports = mongoose.model("Contest", ContestSchema);
