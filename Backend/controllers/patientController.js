import { Patient } from "../schema/patientSchema.js";

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    const patientData = req.body;
    const patient = new Patient(patientData);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error creating patient", error: error.message });
  }
};

// Get a patient by ID
export const getPatient = async (req, res) => {
    try {
      const patientId = req.params.id;
      const patient = await Patient.findById(patientId).populate("medicines");
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: "Error fetching patient", error: error.message });
    }
  };
  

// Delete a patient by ID
export const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully", patient: deletedPatient });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error: error.message });
  }
};


export const addMedicineToPatient = async (req, res) => {
  const { patientId } = req.params;
  const medData = req.body; // { name, time, description }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.medicines.push(medData);
    await patient.save();

    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};