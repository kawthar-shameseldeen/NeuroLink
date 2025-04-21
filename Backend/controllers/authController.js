import { User } from "../models/userModel.js";
import {Patient} from "../schema/patientSchema.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/generateToken.js";
export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    patientName,
    patientAge,
    patientGender,
  } = req.body;

  try {
    // 1️⃣ Check for existing user
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Hash their password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Generate a JWT
    const patient = new Patient({ name: patientName, age: patientAge, gender: patientGender });
    const savedPatient = await patient.save();
    
    // 2) Create & save the User with that same patient embedded
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      patient: {
        name:   patientName,
        age:    patientAge,
        gender: patientGender,
        medicines: []
      }
    });
    await user.save();
    const savedUser = await user.save();
    const token = generateToken(savedUser);
    // 5️⃣ Return both
    return res.status(201).json({
      token,
      user: {
        id:            savedUser._id,
        username:      savedUser.username,
        email:         savedUser.email,
        role:          savedUser.role,
        patient:       savedUser.patient,    // full embedded sub‑doc
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Grab the user (including hashed password)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // 2️⃣ Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3️⃣ Generate a token
    const token = generateToken(user);

    // 4️⃣ Return user + embedded patient data
    const patient = user.patient || {};

    return res.status(200).json({
      token,
      user: {
        id:            user._id,
        username:      user.username,
        email:         user.email,
        role:          user.role,
        patientId:     patient._id,
        patientName:   patient.name   ?? null,
        patientAge:    patient.age    ?? null,
        patientGender: patient.gender ?? null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};