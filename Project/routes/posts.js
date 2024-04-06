var express = require("express");
var router = express.Router();
const Post = require("../models/Post");

// Get posts
router.get("/", async function (req, res, next) {
    try {
        const posts = await Post.find();
        return res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve posts",
        });
    }
});

// Add post
router.post("/add", async (req, res, next) => {
    try {
        await Post.create({
            title: req.body.title,
            content: req.body.content,
        });
        return res.json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to add a post",
        });
    }
});

module.exports = router;
