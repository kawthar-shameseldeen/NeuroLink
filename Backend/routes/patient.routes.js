// routes/patient.routes.js
import { Router } from "express";
import {
    createPatient,
    getPatient,
    addMedicineToPatient,
 } from "../controllers/patientController.js";

const router = Router();
router.post("/:patientId/medicines", addMedicineToPatient);

// 1) Create a patient
router.post("/", createPatient);

// 2) Get a patient (with embedded medicines)
router.get("/:id", getPatient);

export default router;
