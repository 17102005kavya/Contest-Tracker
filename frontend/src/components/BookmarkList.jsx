import { useBookmarks } from "../context/BookmarkContext";
import { removeAllBookmarks } from "../services/bookmarkService";

const BookmarkList = () => {
    const { bookmarks, setBookmarks } = useBookmarks();
    const userId = "123"; // Replace with actual user ID

    const handleRemoveAll = async () => {
        await removeAllBookmarks(userId);
        setBookmarks([]);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Bookmarked Contests</h2>
            {bookmarks.length === 0 ? (
                <p>No bookmarks yet.</p>
            ) : (
                <ul>
                    {bookmarks.map((contest) => (
                        <li key={contest.contestId} className="border p-2 rounded my-2">
                            <h3 className="text-lg font-semibold">{contest.contestName}</h3>
                            <p>{contest.platform}</p>
                            <a href={contest.contestUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                View Contest
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            {bookmarks.length > 0 && (
                <button onClick={handleRemoveAll} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                    Remove All Bookmarks
                </button>
            )}
        </div>
    );
};

export default BookmarkList;
