const axios = require("axios");

const ATCODER_API = "https://kenkoooo.com/atcoder/resources/contests.json";

const fetchAtCoderContests = async () => {
    try {
        const response = await axios.get(ATCODER_API);
        const contests = response.data;

        // Extract upcoming contests
        const upcomingContests = contests
            .filter(contest => new Date(contest.start_epoch_second * 1000) > new Date()) // Only future contests
            .map(contest => ({
                platform: "AtCoder",
                name: contest.title,
                startTime: new Date(contest.start_epoch_second * 1000),
                duration: contest.duration_second / 3600, // Convert to hours
                link: `https://atcoder.jp/contests/${contest.id}`,
                timeRemaining: Math.max(0, contest.start_epoch_second - Math.floor(Date.now() / 1000)) // Time left in seconds
            }))
            .sort((a, b) => a.startTime - b.startTime);

        // Extract finished contests
        const finishedContests = contests
            .filter(contest => new Date(contest.start_epoch_second * 1000) < new Date()) // Only past contests
            .map(contest => ({
                platform: "AtCoder",
                name: contest.title,
                startTime: new Date(contest.start_epoch_second * 1000),
                duration: contest.duration_second / 3600, // Convert to hours
                link: `https://atcoder.jp/contests/${contest.id}`,
            }))
            .sort((a, b) => b.startTime - a.startTime); // Sort latest first

        return { upcomingContests, finishedContests };
    } catch (error) {
        console.error("Error fetching AtCoder contests:", error.message);
        return { upcomingContests: [], finishedContests: [] };
    }
};


module.exports = fetchAtCoderContests;
