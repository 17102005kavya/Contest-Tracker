const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const {
    addBookmark,
    allBookmarkedContests,
    removeBookmark,
    removeAllBookmarks
} = require("../controllers/userController");

// Route to add a bookmark
router.post("/bookmarks", authenticateUser, addBookmark);

// Route to get all bookmarked contests for a user
router.get("/bookmarks", authenticateUser, allBookmarkedContests);

// Route to remove a specific bookmark
router.delete("/bookmarks", authenticateUser, removeBookmark);

// Route to remove all bookmarks for a user
router.delete("/bookmarks/all", authenticateUser, removeAllBookmarks);

module.exports = router;
