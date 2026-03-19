import { pool } from "../../config/db.js";
import { generatePassword } from "../../Utils/generatePassword.js";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../../Utils/responseHandler.js";

export const createTeacherService = async (req, res) => {
  const client = await pool.connect();

  try {
    // TODO

    // 1. VERify all needed details
    const { email, first_name, last_name, gender } = req.body;
    const schoolId = req.user.schoolId;

    if (!email || !firstName || !lastName || !gender) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if userexists
    const userExists = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    console.log(userExists);

    await client.query("BEGIN");

    // 3. Generate and hash password
    const password = generatePassword("cirvee");
    const role = "admin";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.warn("this is teacher password", password);

    // 4. Insert into users table
    const createUserQuery = `
    INSERT INTO users(school_id, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

    // 4a. execute user query

    console.log(schoolId, "schID");
    console.log(email);
    const userResult = await client.query(createUserQuery, [
      schoolId,
      email,
      hashedPassword,
      role,
    ]);
    console.log(userResult);
    const user = userResult.rows[0];
    console.log(user);

    // 5. Insert into teachers table
    const createTeacherQuery = `
    INSERT INTO teachers(user_id, first_name, last_name, gender)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

    // 5b. execute teacher query

    console.log(user.id, "userID");
    console.log(email);
    const teacherResult = await client.query(createTeacherQuery, [
      user.id,
      first_name,
      last_name,
      gender,
    ]);
    console.log(teacherResult);
    const teacher = teacherResult.rows[0];
    console.log("this is to check error", teacher);

    // Commit Transaction
    await client.query("COMMIT");
    res.status(201).json({
      message: "Teacher created successfully ",
      data: {
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: user.email,
        gender: teacher.gender,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);

    return res.status(500).json({
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};

// get  teachers in a school by id
export const getTeachersbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getTeacher = await pool.query(
      `
        
        SELECT * FROM teachers WHERE id = $1`,
      [id],
    );
    console.log(getTeacher);

    const idExists = await pool.query("SELECT * FROM teachers WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      message: "teachers fetched successfully",
      data: {
        teachers: getTeacher.rows,
        noOfTeachers: getTeacher.rowCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Get Teachers failed ",
    });
  }
};

// get all teachers in a school
export const getTeachers = async (req, res) => {
  try {
    const getTeachers = await pool.query(` SELECT * FROM teachers`);
    console.log(getTeachers.rows);

    return successResponse(res, 200, "Teachers fetched successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Fetch teachers failed");
  }
};

// edit teacher by id
export const editTeacherById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { first_name, last_name, gender } = req.body;
    // const schoolId = req.user.schoolId;

    const editTeacher = await pool.query(
      `
      UPDATE teachers SET  first_name = COALESCE($1, first_name), 
      last_name = COALESCE($2, last_name), 
      gender = COALESCE($3, gender) WHERE id = $4 RETURNING *
        `,
      [first_name, last_name, gender, id],
    );

    const idExists = await pool.query("SELECT * FROM teachers WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    console.log(editTeacher);
    return res.status(200).json({
      message: "Teachers edited succesfully",
      data: editTeacher.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit teachers failed",
    });
  }
};

// delete teacher by id
export const deleteTeachersbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteTeacher = await pool.query(
      `
        DELETE FROM teachers WHERE id=$1,
        `[id],
    );
    console.log(deleteTeacher);

    const idExists = await pool.query("SELECT * FROM teachers WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Delete Teacher failed",
    });
  }
};
