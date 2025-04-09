const axios = require("axios");

async function fetchLeetCodeContests() {
    try {
        const response = await axios.post(
            'https://leetcode.com/graphql',
            {
                query: `{
                    allContests {
                        title
                        titleSlug
                        startTime
                        duration
                        isVirtual
                    }
                }`
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://leetcode.com/contest/',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
                }
            }
        );

        if (!response.data?.data?.allContests) {
            throw new Error("Invalid response structure from LeetCode API");
        }

        const currentTime = Date.now();
        const contests = response.data.data.allContests.map(contest => {
            const startTime = new Date(contest.startTime * 1000);
            const endTime = new Date(startTime.getTime() + contest.duration * 1000);
            const isUpcoming = startTime.getTime() > currentTime;
            const isFinished = endTime.getTime() < currentTime;

            return {
                platform: "LeetCode",
                name: contest.title,
                startTime,
                duration: contest.duration / 3600, // Convert to hours
                link: `https://leetcode.com/contest/${contest.titleSlug}`,
                isVirtual: contest.isVirtual,
                isUpcoming,
                isFinished
            };
        });

        // Separate upcoming and finished contests
        const upcomingContests = contests
            .filter(contest => contest.isUpcoming)
            .sort((a, b) => a.startTime - b.startTime);

        const finishedContests = contests
            .filter(contest => contest.isFinished)
            .sort((a, b) => b.startTime - a.startTime);

        return { upcomingContests, finishedContests };
    } catch (error) {
        console.error('Error fetching LeetCode contests:', error.message);
        return { upcomingContests: [], finishedContests: [] };
    }
}

module.exports = fetchLeetCodeContests;