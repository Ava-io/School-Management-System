import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createStudentService, getStudentbyId, getStudents } from "../../Services/Admin/studentService.js";


 const router = Router();

 router.post("/create-student", verifyToken, createStudentService);
 router.get("/student/:id", verifyToken, getStudentbyId);
 router.get("/students", verifyToken, getStudents);

 export default router;