const express = require("express");
const User = require("../models/user");
const route = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");

// create user
route.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

//login
route.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// logout
route.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            token => token.token !== req.token
        );

        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// logout all
route.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// get all users
route.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

//get profile
route.get("/users/me", auth, (req, res) => {
    res.send(req.user);
});

// get one user by id ----- legacy (not use any more)
route.get("/users/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// update user
route.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["age", "name", "email", "password"];
    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        updates.forEach(update => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// delete user
route.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

// Avatar
const upload = multer({
    // dest: "avatars",
    limits: {
        fileSize: 1000000 //byte
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error("Please upload an image"));
        }
        callback(undefined, true);
    }
});

// Upload avatar
route.post(
    "/users/me/avatar",
    auth,
    upload.single("avatar"),
    async (req, res) => {
        const buffer = await sharp(req.file.buffer)
            .resize({
                width: 250,
                height: 250
            })
            .png()
            .toBuffer();

        req.user.avatar = buffer;
        // req.user.avatar = req.file.buffer;
        await req.user.save();
        res.send();
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

// delete avatar
route.delete("/users/me/avatar", auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

// Serve up file
route.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error("Cannot find user or avatar!");
        }

        res.set("Content-Type", "image/png");
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = route;
