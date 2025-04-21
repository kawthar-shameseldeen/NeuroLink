import { Router } from "express";
import {

  getUserByUsername,
  createUser,

} from "../controllers/userController.js";
import { adminProtect,protect } from "../middlewares/protectedRoute.js";
const router = new Router();
router.get("/:username", adminProtect,getUserByUsername);
router.post("/create", createUser);


export default router;

////basic routes 
///register http://localhost:4040/api/register
///login  http://localhost:4040/api/login
////add medicine to the patient http://localhost:4040/api/patients/patientid/medicines