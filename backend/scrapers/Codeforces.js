const axios = require("axios");

const CODEFORCES_API = "https://codeforces.com/api/contest.list";

const fetchCodeforcesContests = async () => {
    try {
        const response = await axios.get(CODEFORCES_API);

        if (response.data.status !== "OK") {
            throw new Error("Failed to fetch contests from Codeforces");
        }

        // Extract only upcoming contests
        const upcomingContests = response.data.result
            .filter(contest => contest.phase === "BEFORE") // Keep only upcoming contests
            .map(contest => ({
                platform: "Codeforces",
                name: contest.name,
                startTime: new Date(contest.startTimeSeconds * 1000),
                duration: contest.durationSeconds / 3600, // Convert to hours
                link: `https://codeforces.com/contest/${contest.id}`,
                timeRemaining: Math.max(0, contest.startTimeSeconds - Math.floor(Date.now() / 1000)) // Time left in seconds
            }))
            .sort((a, b) => a.startTime - b.startTime); // Sort by start time

        // Extract only finished contests
        const finishedContests = response.data.result
            .filter(contest => contest.phase === "FINISHED") // Keep only finished contests
            .map(contest => ({
                platform: "Codeforces",
                name: contest.name,
                startTime: new Date(contest.startTimeSeconds * 1000),
                duration: contest.durationSeconds / 3600, // Convert to hours
                link: `https://codeforces.com/contest/${contest.id}`,
            }))
            .sort((a, b) => b.startTime - a.startTime); // Sort by latest finished contest first

        return { upcomingContests, finishedContests };
    } catch (error) {
        console.error("Error fetching Codeforces contests:", error.message);
        return { upcomingContests: [], finishedContests: [] };
    }
};

// Run the scraper for testing


module.exports = fetchCodeforcesContests;
