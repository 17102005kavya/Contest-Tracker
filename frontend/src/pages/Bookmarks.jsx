import { useEffect } from "react";
import { useBookmarks } from "../context/BookmarkContext";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";
import Header from "../components/Header";
import { motion } from "framer-motion";
import axios from "axios";

const BookmarksPage = () => {
    const { bookmarks, setBookmarks } = useBookmarks();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Fetch bookmarks on mount
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/users/bookmarks`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    params: { userId },
                });

                // Assuming backend returns { bookmarks: [...] }
                setBookmarks(response.data.bookmarks || []);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
                setBookmarks([]); // fallback to empty array on error
            }
        };

        if (userId && token) fetchBookmarks();
    }, [userId, token, setBookmarks]);

    // Remove bookmark
    const handleRemoveBookmark = async (contestId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/users/bookmarks`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                data: { userId, contestId },
            });

            setBookmarks(bookmarks.filter((contest) => contest.contestId !== contestId));
        } catch (error) {
            console.error("Error removing bookmark:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="max-w-6xl mx-auto py-10 px-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">📌 Bookmarked Contests</h1>

                {!bookmarks || bookmarks.length === 0 ? (
                    <p className="text-gray-500">You haven't bookmarked any contests yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookmarks.map((contest) => (
                            <motion.div
                                key={contest.contestId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-lg shadow-md p-6 border"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">{contest.contestName}</h3>
                                <p className="text-sm text-gray-600">{contest.platform}</p>

                                <div className="mt-4 flex justify-between items-center">
                                    <a
                                        href={contest.contestUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        View Contest <FiExternalLink className="ml-1" />
                                    </a>

                                    <button
                                        onClick={() => handleRemoveBookmark(contest.contestId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookmarksPage;
