import { useState, useEffect } from "react";
import { FiBookmark } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";
import { useBookmarks } from "../context/BookmarkContext";
import { addBookmark, removeBookmark } from "../services/bookmarkService";

const BookmarkButton = ({ contest }) => {
    const { bookmarks, setBookmarks } = useBookmarks();
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        // Check if this contest exists in bookmarks
        const bookmarkExists = bookmarks.some(
            (b) =>
                b.contestId === contest.contestId ||
                (b.name === contest.name && b.platform === contest.platform)
        );
        setIsBookmarked(bookmarkExists);
    }, [bookmarks, contest]);

    const handleAddBookmark = async () => {
        const userId = localStorage.getItem("userId"); // Get userId from localStorage

        if (!userId) {
            alert("Please log in to bookmark contests.");
            return;
        }

        try {
            const newBookmark = {
                userId,
                contestName: contest.name,
                contestUrl: contest.link,
                platform: contest.platform,
                startTime: contest.startTime,
                duration: contest.duration,
                contestId: contest.contestId || `${contest.platform}-${contest.name}`,
            };

            const saved=await addBookmark(newBookmark);
            setBookmarks((prev) => [...prev,{ ...contest,contestId:saved._id}]);
            setIsBookmarked(true);
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
    };

    const handleRemoveBookmark = async () => {
        const userId = localStorage.getItem("userId"); // Again, get from localStorage

        if (!userId) {
            alert("Please log in to manage bookmarks.");
            return;
        }

        try {
            const bookmark = bookmarks.find(
                (b) =>
                    b.contestId === contest.contestId ||
                    (b.name === contest.name && b.platform === contest.platform)
            );

            const bookmarkId = bookmark?.contestId;
            if (bookmarkId) {
                await removeBookmark(userId, bookmarkId);
                setBookmarks((prev) => prev.filter((b) => b.contestId !== bookmarkId));
                setIsBookmarked(false);
            }
        } catch (error) {
            console.error("Error removing bookmark:", error);
        }
    };

    const userId = localStorage.getItem("userId");

    if (!userId) {
        // Optional fallback if user is not logged in
        return (
            <button
                onClick={() => alert("Please log in to bookmark contests.")}
                className="flex items-center gap-1 p-2 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                disabled
            >
                <FiBookmark size={16} />
                <span className="text-xs">Save</span>
            </button>
        );
    }

    return (
        <button
          onClick={isBookmarked ? handleRemoveBookmark : handleAddBookmark}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            isBookmarked
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isBookmarked ? (
            <BsBookmarkFill className="inline-block mr-1" />
          ) : (
            <FiBookmark className="inline-block mr-1" />
          )}
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      );
      
};

export default BookmarkButton;