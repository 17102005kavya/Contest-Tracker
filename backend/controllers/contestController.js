const axios = require("axios");
require("dotenv").config();

const fetchCodeforcesContests = require("../scrapers/Codeforces");
const fetchLeetCodeContests = require("../scrapers/Leetcode");
const fetchAtCoderContests = require("../scrapers/AtCoder");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Load API Key from .env

// Function to fetch YouTube tutorial dynamically
async function getYouTubeLink(contestName, platform) {
    try {
        const playlists = {
            "Codeforces": "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB",
            "LeetCode": "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr",
            "AtCoder": "PLY4qyBz7rQ86kKUmXmAcr8_FUyGIy7iJ2",
        };

        const playlistId = playlists[platform];
        if (!playlistId) {
            console.error("Invalid platform");
            return null;
        }

        const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            params: {
                part: "snippet",
                playlistId: playlistId,
                key: YOUTUBE_API_KEY,
                maxResults: 15, // Increase limit
            },
        });

        const videos = response.data.items || [];
        

        if (!videos.length) return "No matching video found.";

        // Normalize contest name (remove spaces, convert to lowercase)
        const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

        const normalizedContestName = normalize(contestName);

        // Find the most relevant video
        const bestMatch = videos.find(video => {
            const videoTitle = normalize(video.snippet.title);
            return videoTitle.includes(normalizedContestName);
        });

        return bestMatch
            ? `https://www.youtube.com/watch?v=${bestMatch.snippet.resourceId.videoId}`
            : "No matching solution found.";
    } catch (error) {
        console.error("Error fetching YouTube video:", error);
        return null;
    }
}


// Endpoint to fetch contest solution
const getContestSolution = async (req, res) => {
    try {
        const { contestName, platform } = req.query;
        if (!contestName) {
            return res.status(400).json({ error: "Contest name is required." });
        }
        if (!platform) {
            return res.status(400).json({ error: "Platform is required." });
        }

        const youtubeLink = await getYouTubeLink(contestName, platform);

        if (!youtubeLink || youtubeLink.includes("No matching solution")) {
            return res.status(404).json({ error: "No solution found for this contest." });
        }

        res.status(200).json({ contestName, youtubeLink });
    } catch (error) {
        console.error("Error in getContestSolution:", error);
        res.status(500).json({ error: "Error fetching YouTube link." });
    }
};

     
    

const getPastContests = async (req, res) => {
    try {
        const [codeforces, leetcode, atcoder] = await Promise.all([
            fetchCodeforcesContests(),
            fetchLeetCodeContests(), // No past contests from LeetCode
            fetchAtCoderContests()
        ]);

        let pastContests = [...codeforces.finishedContests, ...atcoder.finishedContests,...leetcode.finishedContests];

        // Optional filtering by platform
        const { platform } = req.query;
        if (platform) {
            pastContests = pastContests.filter(contest => contest.platform.toLowerCase() === platform.toLowerCase());
        }

        res.status(200).json(pastContests);
    } catch (error) {
        res.status(500).json({ error: "Error fetching past contests" });
    }
};
const getUpcomingContests = async (req, res) => {
    try {
        const [codeforces, leetcode, atcoder] = await Promise.all([
            fetchCodeforcesContests(),
            fetchLeetCodeContests(),
            fetchAtCoderContests()
        ]);

        let upcomingContests = [...codeforces.upcomingContests, ...leetcode.upcomingContests, ...atcoder.upcomingContests];

        // Optional filtering by platform
        const { platform } = req.query;
        if (platform) {
            upcomingContests = upcomingContests.filter(contest => contest.platform.toLowerCase() === platform.toLowerCase());
        }

        res.status(200).json(upcomingContests);
    } catch (error) {
        res.status(500).json({ error: "Error fetching upcoming contests" });
    }
};

module.exports = { getUpcomingContests, getPastContests, getContestSolution };
