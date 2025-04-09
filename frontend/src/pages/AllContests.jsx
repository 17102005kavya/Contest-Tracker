import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiYoutube, FiCalendar, FiClock, FiExternalLink, FiFilter, FiSearch, FiLoader, FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';
import Header from "../components/Header";
import BookmarkButton from "../components/BookmarkButton";

const ContestTracker = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContest, setSelectedContest] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState(null);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);

  const { user } = useAuth();
  const { bookmarks } = useBookmarks();

  const API = "http://localhost:5000/api/v1/contests/contests";

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const endpoint = activeTab === 'upcoming' ? `${API}/upcoming` : `${API}/past`;
        const response = await axios.get(endpoint);
        setContests(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch contests. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [activeTab]);

  const handleYoutubeSearch = async (contest) => {
    setYoutubeLoading(true);
    setSelectedContest(contest);
    try {
      const response = await axios.get(`${API}/solution`, {
        params: {
          contestName: contest.name,
          platform: contest.platform
        }
      });
      setYoutubeLink(response.data.youtubeLink);
      setShowYoutubeModal(true);
    } catch (err) {
      setError('Failed to find solution video. Try searching YouTube manually.');
      console.error(err);
    } finally {
      setYoutubeLoading(false);
    }
  };

  const handleAddToCalendar = (contest) => {
    const startTime = new Date(contest.startTime);
    const endTime = new Date(startTime.getTime() + contest.duration * 60 * 60 * 1000);
    
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.name)}&dates=${
      startTime.toISOString().replace(/-|:|\.\d+/g, '')
    }/${
      endTime.toISOString().replace(/-|:|\.\d+/g, '')
    }&details=${encodeURIComponent(`Compete in ${contest.name} on ${contest.platform}\nContest link: ${contest.link}`)}&location=${encodeURIComponent(contest.platform)}`;

    window.open(calendarUrl, '_blank');
  };

  const filteredContests = contests.filter(contest => {
    if (filter !== 'all' && contest.platform.toLowerCase() !== filter) return false;
    if (searchQuery && !contest.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Programming Contest Tracker
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-600"
          >
            Stay updated with coding competitions and find solution walkthroughs
          </motion.p>
        </div>

        {/* Tabs and Filters */}
        <motion.div 
          className="mb-8 bg-white rounded-xl shadow-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
              {['upcoming', 'past'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab
                      ? 'bg-white shadow text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search contests..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Platforms</option>
                  <option value="codeforces">Codeforces</option>
                  <option value="leetcode">LeetCode</option>
                  <option value="atcoder">AtCoder</option>
                  <option value="codechef">CodeChef</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FiLoader className="animate-spin text-4xl text-blue-600" />
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p>{error}</p>
          </motion.div>
        )}

        {/* Contest List */}
        <AnimatePresence>
          {!loading && !error && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredContests.map((contest) => (
                <motion.div
                  key={`${contest.platform}-${contest.name}-${contest.startTime}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contest.platform.toLowerCase() === 'codeforces' 
                              ? 'bg-red-100 text-red-800'
                              : contest.platform.toLowerCase() === 'leetcode'
                              ? 'bg-yellow-100 text-yellow-800'
                              : contest.platform.toLowerCase() === 'atcoder'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {contest.platform}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">
                          {contest.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 flex-shrink-0" />
                        <span>
                          {new Date(contest.startTime).toLocaleString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-2 flex-shrink-0" />
                        <span>Duration: {contest.duration}h</span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <a
                          href={contest.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          Contest <FiExternalLink className="ml-1" />
                        </a>
                        <button
                          onClick={() => handleAddToCalendar(contest)}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                        >
                          <FiPlus className="mr-1" />
                          Calendar
                        </button>
                        <button
                          onClick={() => handleYoutubeSearch(contest)}
                          disabled={youtubeLoading && selectedContest?.name === contest.name}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                        >
                          {youtubeLoading && selectedContest?.name === contest.name ? (
                            <FiLoader className="animate-spin mr-1" />
                          ) : (
                            <FiYoutube className="mr-1" />
                          )}
                          Solutions
                        </button>
                      </div>

                      {user && <BookmarkButton contest={contest} />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* YouTube Modal */}
        <AnimatePresence>
          {showYoutubeModal && youtubeLink && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowYoutubeModal(false)}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Solution for {selectedContest?.name}
                  </h3>
                  <button 
                    onClick={() => setShowYoutubeModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      src={youtubeLink.replace("watch?v=", "embed/")}
                      className="w-full h-96 rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <a
                      href={youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Watch on YouTube <FiExternalLink className="ml-2" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContestTracker;