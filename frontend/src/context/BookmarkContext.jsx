import { createContext, useState, useContext, useEffect } from "react";
import {
  getBookmarks,
  addBookmark as addBookmarkToUser,
  removeBookmark as removeBookmarkFromUser,
} from "../services/bookmarkService";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    async function fetchBookmarks() {
      try {
        const data = await getBookmarks(userId);
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    }

    fetchBookmarks();
  }, [userId]);

  const addBookmark = async (contest) => {
    try {
      await addBookmarkToUser(userId, contest);
      setBookmarks((prev) => [...prev, contest]);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const removeBookmark = async (contest) => {
    try {
      await removeBookmarkFromUser(userId, contest);
      setBookmarks((prev) =>
        prev.filter(
          (b) => b.name !== contest.name || b.platform !== contest.platform
        )
      );
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark,setBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
