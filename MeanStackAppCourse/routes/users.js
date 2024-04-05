const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

// Register
router.post("/register", async (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    try {
        const user = await User.addUser(newUser);
        res.json({ success: true, msg: "User registered" });
    } catch (err) {
        res.json({ success: false, msg: "Failed to register user" });
    }
});

// Authenticate
router.post("/authenticate", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.getUserByUsername(username);
        if (!user) {
            console.log("User not found");
            return res.json({ success: false, msg: "User not found" });
        }

        const isMatch = await User.comparePassword(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ data: user }, config.secret, {
                expiresIn: 604800, // 1 week
            });
            console.log("User authenticated successfully");
            return res.json({
                success: true,
                token: "JWT " + token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                },
            });
        } else {
            console.log("Wrong password");
            return res.json({ success: false, msg: "Wrong password" });
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.json({ success: false, msg: "Server error" });
    }
});

// Profile
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.json({ user: req.user });
    }
);

module.exports = router;
