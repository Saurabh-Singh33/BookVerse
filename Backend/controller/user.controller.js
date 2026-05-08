import User from "../model/user.model.js";
import Book from "../model/book.model.js";
import bcryptjs from "bcryptjs";
export const signup = async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addReadBook = async(req, res) => {
    try {
        const { userId, bookId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add bookId to readBooks if not already present
        if (!user.readBooks.includes(bookId)) {
            user.readBooks.push(bookId);
            await user.save();
        }

        res.status(200).json({ message: "Book added to recently read" });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUsersWithReadBooks = async(req, res) => {
    try {
        const users = await User.find()
            .select("fullname email readBooks")
            .populate({
                path: "readBooks",
                select: "name price category", // Get name and price (to check if paid)
            });

        // The user specifically asked for "1st 2 books he read"
        // We can just slice it in the response or here.
        const result = users.map((user) => ({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            recentBooks: user.readBooks.slice(0, 2),
        }));

        res.status(200).json(result);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};