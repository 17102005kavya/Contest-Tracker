const fetchCodeforcesContests = require("./codeforces");
const fetchLeetCodeContests = require("./leetcode");
const fetchAtCoderContests = require("./atcoder");

const fetchAllContests = async () => {
    const [codeforces, leetcode, atcoder] = await Promise.all([
        fetchCodeforcesContests(),
        fetchLeetCodeContests(),
        fetchAtCoderContests()
    ]);

    return {
        upcomingContests: [...codeforces.upcomingContests, ...leetcode.upcomingContests, ...atcoder.upcomingContests],
        finishedContests: [...codeforces.finishedContests, ...atcoder.finishedContests]
    };
};

// Run the combined scraper for testing
fetchAllContests().then(data => console.log(data));

module.exports = fetchAllContests;
