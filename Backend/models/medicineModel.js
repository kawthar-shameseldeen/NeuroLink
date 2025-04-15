import mongoose, { Schema } from "mongoose";

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      // You can store a full datetime or adjust this as needed
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const Medicine = mongoose.model("Medicine", medicineSchema);
