import express from "express";
import dotenv from "dotenv";
// import { initDb } from "./src/config/db.js";
import teacherRoutes from "./src/routes/Admin/teacher.js";

//  routes
import authRoutes from "./src/routes/Auth/Auth.js";
import userRoutes from "./src/routes/User.js";
import deptRoutes from "./src/routes/Admin/department.js";
import studRoutes from "./src/routes/Admin/student.js";
import schRoutes from "./src/routes/Admin/school.js";
import subRoutes from "./src/routes/Admin/subject.js";
import annRoutes from "./src/routes/Admin/announcement.js";
import assRoutes from "./src/routes/Admin/assignment.js";


// this is to initialize dotenv
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware to.         parse JSON bodies
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/teacher", teacherRoutes);
app.use("/department", deptRoutes);
app.use("/student", studRoutes);
app.use("/school", schRoutes);
app.use("/subject", subRoutes);
app.use("/ann", annRoutes);
app.use("/ass", assRoutes);

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`My server is running at https://localhost:${port}`);
  // initDb();
});
