const Users = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register new user
async function register(req, res) {
    try {
        console.log(req.body, "req");
        const { username, role, email, password, imageUrl } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        await Users.create({ username, role, email, password: hashedPassword, imageUrl });
        res.status(201).json({ message: "User added successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ message: "Email already in use, please try another email address" });
    }
}

// Login user
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) return res.status(404).json({ status: "err", message: "Email not found! Please enter your exact email address or create a new account." });

        const isMatched = bcrypt.compareSync(password, user.password);
        if (!isMatched) return res.status(404).json({ status: "err", message: "Wrong password" });

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp }, "ossema");
        const options = {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        };
        res.cookie("authorization", token, options);
        res.status(201).json({ status: "success", token, user, message: `Welcome ${user.username}` });
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}

// Logout user
const logout = async (req, res) => {
    try {
        res.clearCookie("authorization");
        res.status(200).json("You have signed out. Goodbye!");
    } catch (err) {
        res.sendStatus(404);
    }
}

// Check authentication
const checkAuth = (req, res) => {
    try {
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving users" });
    }
}

// Get one user
const getOneUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving user" });
    }
}

module.exports = { register, login, logout, checkAuth, getAllUsers, getOneUser };
