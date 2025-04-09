const Bookmark = require("../models/ContestSchema");
const User = require("../models/UserSchema");
const mongoose = require("mongoose");

// ✅ Add a bookmark for a user
const addBookmark = async (req, res) => {
    try {
        const { userId,  platform, contestName, startTime, duration, contestUrl } = req.body;
        const objectId = new mongoose.Types.ObjectId(userId);
        console.log(objectId);
        // Check if the contest is already bookmarked
        let bookmark = await Bookmark.findOne({ platform,contestName,startTime});
        if (!bookmark) {
            // Create a new bookmark if it does not exist
            bookmark = new Bookmark({ platform, contestName, startTime, duration, contestUrl });
            await bookmark.save();
        }

        // Add the bookmark reference to the user's bookmarks array
        const updatedUser = await User.findByIdAndUpdate(
            objectId,
            { $addToSet: { bookmarks: bookmark._id } }, // Store only _id reference
            { new: true }
        );

        res.status(201).json({ message: "Bookmark added successfully",_id: bookmark._id });
    } catch (error) {
        console.error("Error adding bookmark:", error);
        res.status(500).json({ error: "Error adding bookmark" });
    }
};


// ✅ Get all bookmarked contests for a user
const allBookmarkedContests = async (req, res) => {
    try {
        const { userId } = req.query;  // Use query params, not body

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const objectId = new mongoose.Types.ObjectId(userId);
        

        // Fetch user with populated bookmarks
        const user = await User.findById(objectId).populate("bookmarks").lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send back the populated contests (bookmarks)
        res.status(200).json(user.bookmarks || []);
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ error: "Error fetching bookmarks" });
    }
};


// ✅ Remove a specific bookmark


const removeBookmark = async (req, res) => {
    try {
        const { userId, contestId } = req.body;
        const objectId = new mongoose.Types.ObjectId(userId);
        // Convert contestId to ObjectId
        const contestObjectId = new mongoose.Types.ObjectId(contestId);

        // Remove the contest from the user's bookmarks array
        const updatedUser = await User.findByIdAndUpdate(
            objectId,
            { $pull: { bookmarks: contestObjectId } }, // Pull contestId from bookmarks array
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if any other users still reference this bookmark
        const existingReference = await User.exists({ bookmarks: contestObjectId });

        // If no users reference this contest, delete it from the Bookmark collection
        if (!existingReference) {
            await Bookmark.findByIdAndDelete(contestObjectId);
            console.log("Bookmark deleted from database");
        }

        res.status(200).json({ message: "Bookmark removed successfully", updatedUser });
    } catch (error) {
        console.error("Error removing bookmark:", error);
        res.status(500).json({ error: "Error removing bookmark" });
    }
};


const removeAllBookmarks = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user
        const objectId = new mongoose.Types.ObjectId(userId);
        const user = await User.findById({objectId});
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Store previous bookmarks before clearing them
        const removedContests = user.bookmarks.map(id => new mongoose.Types.ObjectId(id));

        // Clear bookmarks array for the user
        await User.findByIdAndUpdate(userId, { $set: { bookmarks: [] } }, { new: true });

        if (removedContests.length > 0) {
            // Check if any contests are still referenced
            const contestsStillReferenced = await User.find({ bookmarks: { $in: removedContests } }).distinct("bookmarks");

            // Find contests that no one references anymore
            const contestsToDelete = removedContests.filter(contestId => !contestsStillReferenced.includes(contestId));

            // Bulk delete unreferenced contests
            if (contestsToDelete.length > 0) {
                await Bookmark.deleteMany({ _id: { $in: contestsToDelete } });
                console.log(`Deleted ${contestsToDelete.length} unreferenced bookmarks`);
            }
        }

        res.status(200).json({ message: "All bookmarks removed successfully" });
    } catch (error) {
        console.error("Error removing all bookmarks:", error);
        res.status(500).json({ error: "Error removing bookmarks" });
    }
};



module.exports = { addBookmark, allBookmarkedContests, removeBookmark, removeAllBookmarks };
