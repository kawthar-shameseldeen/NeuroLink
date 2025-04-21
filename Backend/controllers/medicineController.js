// controllers/medicineController.js
import mongoose from "mongoose";
import { Medicine } from "../models/medicineModel.js";

// GET all medicines
export const getAllMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find();
    res.status(200).json(meds);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching medicines", error: error.message });
  }
};

// CREATE a new medicine// controllers/medicineController.js
export const createMedicine = async (req, res) => {
    const { name, time, description, patientId } = req.body;
    try {
      const medicine = new Medicine({
        name,
        time,
        description,
        patient: patientId   // ← link here
      });
      const saved = await medicine.save();
      res.status(201).json(saved);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating medicine", error: error.message });
    }
  };
  // controllers/medicineController.js

// GET /api/medicines/patient/:patientId
export const getMedicinesByPatient = async (req, res) => {
    const { patientId } = req.params;
    try {
      const meds = await Medicine.find({ patient: patientId });
      res.status(200).json(meds);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching medicines", error: error.message });
    }
  };
  

// UPDATE an existing medicine by id
export const updateMedicine = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid medicine ID" });
  }
  try {
    const medicine = await Medicine.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating medicine", error: error.message });
  }
};

// DELETE a medicine by id
export const deleteMedicine = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid medicine ID" });
  }
  try {
    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res
      .status(200)
      .json({ message: "Medicine deleted successfully", medicine });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting medicine", error: error.message });
  }
};

