const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: { type: String },
    content: { type: String },
});

module.exports = mongoose.model("posts", postSchema);
