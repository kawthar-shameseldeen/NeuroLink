import mongoose, { Schema } from "mongoose";
import { Medicine } from "../models/medicineModel.js";

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  // Array of ObjectId references to Medicine documents
  medicines: {
    type:    [Medicine.schema],
    default: []
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export const Patient = mongoose.model("Patient", patientSchema);
