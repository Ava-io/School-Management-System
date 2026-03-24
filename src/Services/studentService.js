import { pool } from "../config/db.js";
import { generatePassword } from "../Utils/generatePassword.js";
import bcrypt from "bcrypt";

// Create Students
export const createStudentService = async (req, res) => {
  try {
    // 1. Verify all needed details
    const { email, first_name, last_name, state_of_origin, gender, age } =
      req.body;
    const schoolId = req.user.schoolId;

    if (
      !email ||
      !first_name ||
      !last_name ||
      !state_of_origin ||
      !gender ||
      !age
    ) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. check if user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "email already exists",
      });
    }
    console.log(userExists);

    await pool.query("BEGIN");

    // 3. Generate Password and hash password
    const password = generatePassword("students");
    const role = "student";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.warn("this is student password", password);

    // 4. Insert into users table
    const createUserQuery = `
        INSERT INTO users(school_id, email,password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;

    // 4. Execute user query
    console.log(schoolId, "schID");
    console.log(email);
    const userResult = await pool.query(createUserQuery, [
      schoolId,
      email,
      hashedPassword,
      role,
    ]);
    console.log(userResult);
    const user = userResult.rows[0];
    console.log(user);

    // 5. Insert into student query
    const createStudentQuery = `
   INSERT INTO students(user_id, first_name, last_name, gender, state_of_origin, age)
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING *
   `;

    // 5b. execute teacher query
    console.log(user.id, "userID");
    console.log(email);
    const studResult = await pool.query(createStudentQuery, [
      user.id,
      first_name,
      last_name,
      gender,
      state_of_origin,
      age,
    ]);
    console.log(studResult);
    const student = studResult.rows[0];

    // commit transaction
    await pool.query("COMMIT");
    res.status(201).json({
      message: "Student created successfully",
      data: {
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        state_of_origin: student.state_of_origin,
        gender: student.gender,
        age: student.age,

        student: studResult.rows,
        noOfStudents: studResult.rowCount,
      },
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);

    return res.status(500).json({
      message: "Failed to create student",
      error: error.message,
    });
  }
};

// get students by id
export const getStudentbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getStudent = await pool.query(
      `
            SELECT * FROM students WHERE id = $1
            `,
      [id],
    );
    console.log(getStudent);

    const idExists = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "student fetched successfully",
      data: {
        student: getStudent.rows,
        noOfStudents: getStudent.rowCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Get student failed",
    });
  }
};

// get all students
export const getStudents = async (req, res) => {
  try {
    const getStudents = await pool.query(`SELECT * FROM students`);
    console.log(getStudents.rows);

    return res.status(200).json({
      message: "All students fetched successfully",
      data: getStudents.rows,
    });
  } catch (error) {}
};

// edit students by id

export const editStudentById = async (req, res) => {
  try {
    const { email, first_name, last_name, state_of_origin, gender, age } =
      req.body;

    const id = parseInt(req.params.id);

    const idExists = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const editStudent = await pool.query(
      `
            UPDATE students SET first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name),
            gender = COALESCE($3, gender), 
            state_of_origin = COALESCE($4, state_of_origin), 
            age = COALESCE($5, age)
            WHERE id = $6
            RETURNING *
            `,
      [first_name, last_name, gender, state_of_origin, age, id],
    );
    console.log(editStudent);
    return res.status(200).json({
      message: "Students edited successfully",
      data: editStudent.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit students failed",
    });
  }
};

// delete student by id
export const deleteStudentbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deleteStudent = await pool.query(
      ` DELETE FROM students WHERE id=$1`,
      [id],
    );

    console.log(deleteStudent);

    const idExists = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "student deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Delete student failed",
    });
  }
};
