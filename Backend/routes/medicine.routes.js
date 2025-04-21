import { Router } from "express";
import {
  getAllMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicinesByPatient,
  

} from "../controllers/medicineController.js";
import { addMedicineToPatient } from "../controllers/patientController.js";

const router = Router();

// GET   /api/medicines
router.get("/", getAllMedicines);

// POST  /api/medicines
router.post("/", createMedicine);

// PUT   /api/medicines/:id
router.put("/:id", updateMedicine);

// DELETE /api/medicines/:id
router.delete("/:id", deleteMedicine);

router.put("/:id",        updateMedicine);
router.delete("/:id",     deleteMedicine);
router.get("/patient/:patientId", getMedicinesByPatient);  // ← new
export default router;
