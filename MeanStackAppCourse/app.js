const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const session = require("express-session");

mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
    console.log("Connected to Database " + config.database);
});

mongoose.connection.on("error", (err) => {
    console.log("Database error " + err);
});

const app = express();

const users = require("./routes/users");

// Port number
const port = 3000;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(
    session({
        secret: "hahaa",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.session());

require("./config/passport")(passport);

// Routes
app.use("/users", users);

app.get("/", (req, res) => {
    res.send("Invalid endpoint");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
    console.log("Server running on port 3000");
});
