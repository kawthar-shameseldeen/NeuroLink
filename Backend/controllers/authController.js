import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/generateToken.js";
export const register = async (req, res) => {
 
  const { username, email, password, role, iotDeviceName, patientName, patientAge, patientGender } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // // Define a default IoT device configuration
    // const defaultIotDevice = {
    //   deviceName: iotDeviceName || "Space-Journey-Device",
    //   status: "off",
    // };

    // Create a new User document
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      iotDevices: [defaultIotDevice],
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Create a new Patient document with the provided patient info
    const patient = new Patient({
      name: patientName,
      age: patientAge,
      gender: patientGender,
    });

    // Save the patient to the database
    const savedPatient = await patient.save();

    const token = generateToken(savedUser);

    // Send a success response, including both the user and patient data
    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
        iotDevices: savedUser.iotDevices,
      },
      patient: savedPatient,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user and populate the 'patient' field to extract the patient's name
    const user = await User.findOne({ email })
      .select("+password")
      .populate("patient", "name"); // Only include the 'name' field from the Patient model

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        patientName: user.patient ? user.patient.name : null, // Return the patient name if available
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};