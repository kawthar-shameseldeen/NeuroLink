import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";
import { Patient } from "../schema/patientSchema.js";
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },

  // iotDevices: {
  //   type: [iotSchema],
  //   default: [],
  //   select: false,
  // },
  patient: {
    type:     Patient.schema,
    required: false,               // no longer strictly required
    default:  { name: null, age: null, gender: null }
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
