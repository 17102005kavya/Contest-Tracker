const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
        if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

        // ✅ Verify the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user ID to request object

        next(); // Move to the next middleware or route
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

module.exports = authenticateUser;
