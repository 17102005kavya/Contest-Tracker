const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
require("dotenv").config(); // Load environment variables

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use." });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User created successfully!"});
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ 
            message: "Login successful!",
            token, 
            userId: user._id.toString() 
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Export both signup & login functions
module.exports = { signup, login };
