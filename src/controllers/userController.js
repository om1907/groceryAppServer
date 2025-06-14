import User from "../models/userModal.js";

const userLoginController = async(req, res ) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Respond with user data (excluding password)
        const { password: _, ...userData } = user.toObject();
        res.status(200).json(userData);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const userRegisterController = async(req, res) => {
    try {
        const { name, email, password, role = '' } = req.body;
        // Check if user already exists
        if(!email || !password || !name) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        // Respond with user data (excluding password)
        const { password: _, ...userData } = newUser.toObject();
        return res.status(201).json(userData);
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


export {
    userLoginController,
    userRegisterController,
}