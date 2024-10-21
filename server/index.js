require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const app = express();
require("./db"); // Assuming this sets up your database connection
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { verifyJWT } = require("./middlewares/auth");
const User = require("./models/users");
const Mentor = require("./models/mentor");
const note = require("./models/note");
app.use(cors());
app.use(express.json());

const jwtKey = process.env.JWT_SECRET; // Load JWT secret key from .env

// check rout db
app.get("/", async (req, res) => {
  const existingUser = await User.findOne({
    email: "onestopshop3322@gmail.com",
  });

  res.send({ try: "Baba ji ka thulu ", send: process.env.EMAIL });
});

// Ensure upload directories exist
const directories = ["/uploads/Profiles", "/uploads/Notes"];
directories.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Multer storage configuration
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads", "Profiles"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const Notes = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads", "Notes"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const profiles = multer({ storage: profileStorage }).single("dp");
const notesPics = multer({ storage: Notes }).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images" },
]);
app.use(
  "/uploads/profiles",
  express.static(path.join(__dirname, "uploads", "Profiles"))
);

app.use(
  "/uploads/Notes",
  express.static(path.join(__dirname, "uploads", "Notes"))
);

// OTP Map (ideally should use Redis or a similar store for scalability)
const otpMap = new Map();

// Nodemailer configuration
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, // Email loaded from .env
    pass: process.env.EMAIL_PASS, // Password loaded from .env
  },
});

// Helper function to send OTP via email
const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL, // Corrected
    to: email,
    subject: "OTP for login",
    text: `Your OTP is ${otp}`,
  };
  return transporter.sendMail(mailOptions);
};

// Example route for sending OTP
app.post("/getOTP", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ msg: "User already exists", status: false });
  }

  let otp = Math.floor(1000 + Math.random() * 9000);
  const option = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for login",
    text: "Your OTP is " + otp,
  };

  transporter.sendMail(option, (err, info) => {
    if (err)
      return res.status(202).json({ msg: err, status: false, auth: info });
    res.status(200).json({ msg: info, status: true, otp: otp });
  });
});

// User Registration
app.post("/registerUser", profiles, async (req, res) => {
  const { firstName, lastName, gender, password, email } = req.body;
  const dp = req.file; // Access the uploaded file
  try {
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ msg: "User already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
      dp: dp.filename, // Save the filename
    });

    const savedUser = await newUser.save();
    res.status(201).json({ msg: "User registered successfully", status: true });
  } catch (error) {
    res.status(500).json({ msg: error, status: false });
    console.log(error);
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found", status: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", status: false });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      msg: "Login successful",
      status: true,
      auth: token,
      userData: user,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message, status: false });
  }
});

// Email check for password reset
app.post("/checkEmail", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      await sendOtpEmail(email, otp);
      res
        .status(200)
        .json({ msg: "OTP sent", status: true, exists: true, otp });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message, status: false });
  }
});

// Password reset route
app.post("/changePassword", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res
        .status(200)
        .json({ msg: "Password updated successfully", status: true });
    } else {
      res.status(404).json({ msg: "User not found", status: false });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message, status: false });
  }
});

// Change password with old password verification
app.post("/changepass", verifyJWT, async (req, res) => {
  const { oldpass, newPass } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const isOldPassValid = await bcrypt.compare(oldpass, user.password);

    if (!isOldPassValid) {
      return res
        .status(400)
        .json({ msg: "Invalid old password", status: false });
    }

    const hashedNewPassword = await bcrypt.hash(newPass, 10);
    user.password = hashedNewPassword;
    await user.save();

    res
      .status(200)
      .json({ msg: "Password changed successfully", status: true });
  } catch (error) {
    res.status(500).json({ msg: error.message, status: false });
  }
});

// profile

app.get("/profile/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findById(id);
    if (!response) {
      return res.status(404).json({ msg: "User not found", status: false });
    }

    const newResponse = {
      ...response._doc,
      dp: `${req.protocol}://${req.get("host")}/uploads/Profiles/${
        response.dp
      }`,
    };

    res.json({ msg: "API called", res: newResponse, status: true });
  } catch (err) {
    res.json({ msg: "Error fetching mentor", res: err.message, status: false });
  }
});

app.post("/addMentor", verifyJWT, async (req, res) => {
  const {
    userId,
    name,
    experience,
    expertise,
      field,
      about,
    location,
    price,
    qualification,
    availabilityDays,
    availabilityTime,
    whatsappNumber,
  } = req.body;

  try {
    // Validate required fields
    if (
      !userId ||
      !name ||
      !experience ||
      !expertise ||
      !field ||
      !about ||
      !location ||
      !price ||
      !qualification ||
      !availabilityDays ||
      !whatsappNumber
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new mentor
    const newMentor = new Mentor({
      userId,
      name,
      experience,
      location,
      expertise,
      field,
      about,
      price,
      qualification,
      availabilityDays,
      availabilityTime,
      whatsappNumber,
    });

    // Save mentor to the database
    await newMentor.save();
    if (newMentor) {
      await User.updateOne(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $set: { mentor: true } }
      );
    }
    return res
      .status(201)
      .json({
        message: "Mentor added successfully!",
        mentor: newMentor,
        status: true,
      });
  } catch (error) {
    console.error("Error saving mentor:", error); // Log the error
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
});

app.post("/addNote", verifyJWT, notesPics, async (req, res) => {
  const { userId, title, category, subject, price, description } = req.body;

  // Retrieve file paths for coverImage and images
  const coverImage = req.files.coverImage
    ? path.basename(req.files.coverImage[0].path)
    : null;

  // Get the array of image filenames
  const images = req.files.images
    ? req.files.images.map((file) => path.basename(file.path))
    : [];

  try {
    // Validate required fields
    if (
      !title ||
      !category ||
      !subject ||
      !price ||
      !description ||
      !coverImage
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new note
    const newNote = new note({
      userId,
      title,
      category,
      subject,
      price,
      description,
      coverImage,
      images,
    });
    if (newNote) {
      await User.updateOne(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $set: { notes: true } }
      );
    }

    // // Save note to the database
    await newNote.save();
    return res
      .status(201)
      .json({
        message: "Note added successfully!",
        note: newNote,
        status: true,
      });
  } catch (error) {
    console.error("Error saving note:", error); // Log the error
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
});

app.get("/viewNotes", verifyJWT, async (req, res) => {
  try {
    const response = await note.find(); // Retrieve all mentors
    const newResponse = response.map((v) => ({
      ...v._doc,
      coverImage: `${req.protocol}://${req.get("host")}/uploads/Notes/${
        v.coverImage
      }`,
      images: v.images.map(
        (image) => `${req.protocol}://${req.get("host")}/uploads/Notes/${image}`
      ),
    }));

    res.json({ msg: "API called", res: newResponse, status: true });
  } catch (err) {
    res.json({ msg: err.message, status: false });
  }
});
app.get("/viewNotes/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await note.findById(id);
    if (!response) {
      return res.status(404).json({ msg: "Notes not found", status: false });
    }

    const newResponse = {
      ...response._doc,
      coverImage: `${req.protocol}://${req.get("host")}/uploads/Notes/${
        response.coverImage
      }`,
      images: response.images.map(
        (image) => `${req.protocol}://${req.get("host")}/uploads/Notes/${image}`
      ),
    };

    res.json({ msg: "API called", res: newResponse, status: true });
  } catch (err) {
    res.json({ msg: "Error fetching mentor", res: err.message, status: false });
  }
});



app.get("/searchNotes", verifyJWT, async (req, res) => {
  const { search } = req.query; // Get the 'search' query parameter

  try {
    // Build a search query to match 'search' in name, field, or expertise
    let searchQuery = {
      $or: [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search for 'name'
        { category: { $regex: search, $options: "i" } }, // Case-insensitive search for 'field'
        { subject: { $regex: search, $options: "i" } }, // Case-insensitive search for 'expertise'
      ],
    };

    const response = await note.find(searchQuery)

    // Modify each mentor response to include full URL for 'dp'
    const updatedResponse = response.map((mentor) => {
   
        const currentDp = mentor.coverImage;
        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/Notes/`;

        // Only prepend the base URL if it's not already included
        if (!currentDp.startsWith(baseUrl)) {
          mentor.coverImage = baseUrl + currentDp;
        }
      return mentor;
    });

    res.json({ msg: "API called", res: updatedResponse, status: true });
  } catch (err) {
    res.json({ msg: err.message, status: false });
  }
});


app.get("/viewMentor", verifyJWT, async (req, res) => {

  try {
    const response = await Mentor.find()
      .populate({
        path: "userId", // Reference to the 'User' model
        select: "firstName lastName dp", // Select only the required fields
      });

    // Modify each mentor response to include full URL for 'dp'
    const updatedResponse = response.map((mentor) => {
      if (mentor.userId && mentor.userId.dp) {
        const currentDp = mentor.userId.dp;
        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/Profiles/`;
    
        // Only prepend the base URL if it's not already included
        if (!currentDp.startsWith(baseUrl)) {
          mentor.userId.dp = baseUrl + currentDp;
        }
      }
      return mentor;
    });
    

    res.json({ msg: "API called", res: updatedResponse, status: true });
  } catch (err) {
    res.json({ msg: err.message, status: false });
  }
});



app.get("/viewMentor/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Mentor.findById({userId: new mongoose.Types.ObjectId(id),
  })
    .populate("User")
    if (!response) {
      return res.status(404).json({ msg: "Mentor not found", status: false });
    }


    res.json({ msg: "API called", res: response, status: true });
  } catch (err) {
    res.json({ msg: "Error fetching mentor", res: err.message, status: false });
  }
});



app.get("/searchMentor", verifyJWT, async (req, res) => {
  const { search } = req.query; // Get the 'search' query parameter

  try {
    // Build a search query to match 'search' in name, field, or expertise
    let searchQuery = {
      $or: [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search for 'name'
        { field: { $regex: search, $options: "i" } }, // Case-insensitive search for 'field'
        { expertise: { $regex: search, $options: "i" } }, // Case-insensitive search for 'expertise'
      ],
    };

    const response = await Mentor.find(searchQuery)
      .populate({
        path: "userId", // Reference to the 'User' model
        select: "firstName lastName dp", // Select only the required fields
      });

    // Modify each mentor response to include full URL for 'dp'
    const updatedResponse = response.map((mentor) => {
      if (mentor.userId && mentor.userId.dp) {
        const currentDp = mentor.userId.dp;
        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/Profiles/`;

        // Only prepend the base URL if it's not already included
        if (!currentDp.startsWith(baseUrl)) {
          mentor.userId.dp = baseUrl + currentDp;
        }
      }
      return mentor;
    });

    res.json({ msg: "API called", res: updatedResponse, status: true });
  } catch (err) {
    res.json({ msg: err.message, status: false });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
