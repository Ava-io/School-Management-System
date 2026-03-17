import { pool } from "../../config/db.js";

// Create subject
export const createSubjectService = async (req, res) => {
  try {
    const { name, CODE, status, dept_id } = req.body;
    const schoolId = req.user.schoolId;

    if (!name || !CODE || !status || !dept_id) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if subject exists
    const subExists = await pool.query(
      "SELECT * FROM subjects WHERE name = $1",
      [name],
    );

    if (subExists.rows.length > 0) {
      return res.status(400).json({
        message: "Subject already exists",
      });
    }
    console.log(subExists);

    // 3. Create subject query

    const createSubjectQuery = `
        INSERT INTO subjects(name)
        VALUES ($1)
        RETURNING *
        `;

    // 4. execute subject query
    console.log(schoolId, "schID");
    console.log(name);
    const subResult = await pool.query(createSubjectQuery, [name]);
    console.log(subResult);

    return res.status(201).json({
      message: "Subject created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create department",
      error: error.message,
    });
  }
};

// get all subject in a department
export const getSubjects = async (req, res) => {
  try {
    const getSubjects = await pool.query(`SELECT * FROM subjects`);
    console.log(getSubjects.rows);

    return res.status(200).json({
      message: "All subjects gotten successfully",
      data: getSubjects.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Get subjects failed",
    });
  }
};

// get subject by id
export const getSubBYId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getSubject = await pool.query(
      `
           SELECT * FROM subjects WHERE id = $1 
            `,
      [id],
    );
    console.log(getSubject);
    return res.status(200).json({
      message: "Subject fetched successfully ",
      data: {
        subj: getSubject.rows,
        totalSubject: getSubject.rowCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Get subject failed",
    });
  }
};

// edit subject by id
export const editSubById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const editSub = await pool.query(
      `
           UPDATE subjects SET name=$1
           WHERE id=$2
           RETURNING * 
            `,
      [name, id],
    );
    console.log(editSub);

    return res.status(200).json({
      message: "Subject edited successfully",
      data: editSub,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit subjects failed",
    });
  }
};

// delete subjects by id
export const deleteSubjectbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteSub = await pool.query(
      `
           DELETE FROM subjects WHERE ID=$1, 
            `[id],
    );
    console.log(deleteSub);

    return res.status(200).json({
      message: "Delete subjects failed",
    });
  } catch (error) {}
};
