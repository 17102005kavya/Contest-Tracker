const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hash before storing
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contest", default: [] }]// References contest IDs
});

module.exports = mongoose.model("User", UserSchema);
