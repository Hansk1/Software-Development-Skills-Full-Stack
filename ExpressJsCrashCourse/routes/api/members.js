const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

// Gets all members
router.get("/", (req, res) => res.json(members));

// Get single member
router.get("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id)
    );

    if (!found) {
        res.status(400).send("User Not found");
    } else {
        res.json(
            members.filter((member) => member.id === parseInt(req.params.id))
        );
    }
});

// Create member
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
    };

    if (!newMember.name || !newMember.email) {
        res.status(400).send("Please include a name and email");
    } else {
        members.push(newMember);
        res.json(members);
    }
});

// Update member
router.put("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id)
    );

    if (!found) {
        res.status(400).send("User Not found");
    } else {
        const updMember = req.body;
        members.forEach((member) => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg: "Member updated", member });
            }
        });
    }
});

// Delete member
router.delete("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id)
    );

    if (!found) {
        res.status(400).send("User Not found");
    } else {
        res.json({
            msg: "Member deleted",
            members: members.filter(
                (member) => member.id !== parseInt(req.params.id)
            ),
        });
    }
});

module.exports = router;
