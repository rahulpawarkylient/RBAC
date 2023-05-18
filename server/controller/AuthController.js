import RegisterModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER API
export const register = async (req, res) => {
  try {
    const { username, name, email, password, role } = req.body;
    if (!username || !name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user with the same email already exists
    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }

    // Check if password meets the requirements
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new RegisterModel({
      username,
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: `${username} register successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

//LOGIN API

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await RegisterModel.findOne({ email });
    if (!user) {
      // If user with given email is not found in the database, return a 401 error response
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If the passwords do not match, return a 401 error response
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { user: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Set token expiration time to 1 hour
    );

    // Return a success response with the JWT token
    res.status(200).json({ message: `${user.email} Login Success..`, token });
  } catch (error) {
    // Handle any errors that occur during the login process
    console.log(error.message);
    res.status(500).json({ message: "Error while logging in" });
  }
};

export const getallusers = async (req, res) => {
  try {
    const users = await RegisterModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
