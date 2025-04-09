const express = require("express");
const router = express.Router();
const { getUpcomingContests, getPastContests ,getContestSolution } = require("../controllers/contestController");

// Get upcoming contests dynamically
router.get("/contests/upcoming", getUpcomingContests);

// Get past contests dynamically
router.get("/contests/past", getPastContests);

router.get("/contests/solution", getContestSolution);

module.exports = router;
