import { User } from "../models/userModel.js";
import eventSchema from "../schema/eventSchema.js";
export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const getUserByUsername = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username }).select(
        "-password +iot+event"
      ); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  };

  export const registerIot = async (req, res) => {
    try {
      const { userId, iotData } = req.body;
  
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  

      if (!Array.isArray(user.iotDevices)) {
        user.iotDevices = []; 
      }
  
      user.iotDevices.push(iotData);
      await user.save();
  
      res
        .status(201)
        .json({ message: "IoT device registered successfully", user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering IoT device", error: error.message });
    }
  };
 
 
  
