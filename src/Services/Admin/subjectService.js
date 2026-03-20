import { pool } from "../../config/db.js";

// Create subject
export const createSubjectService = async (req, res) => {
  try {
    // 1. verify required fields
    const { name, code, dept_id } = req.body;
    const schoolId = req.user.schoolId;

    if (!name || !code || !dept_id) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    // a. Check if subject exists
    const subExists = await pool.query(
      "SELECT * FROM subjects WHERE name = $1",
      [name],
    );
    console.log("check if subject exist", subExists);
    if (subExists.rows.length > 0) {
      return res.status(400).json({
        message: "Subject already exists",
      });
    }

    // b. Create subject query

    const createSubjectQuery = `
        INSERT INTO subjects(name, code, dept_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `;

    // c. execute subject query
    console.log(schoolId, "schID");
    console.log(name);
    const subResult = await pool.query(createSubjectQuery, [
      name,
      code,
      dept_id,
    ]);
    console.log(subResult);

    const subject = subResult.rows[0];
    console.log(subject);

    return res.status(201).json({
      message: "Subject created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create subject",
      error: error.message,
    });
  }
};

// 2.  get all subject in a department
export const getSubjects = async (req, res) => {
  try {
    const getSubjects = await pool.query(`SELECT * FROM subjects`);
    console.log(getSubjects.rows);

    return res.status(200).json({
      message: "All subjects gotten successfully",
      data: getSubjects.rows,
      //  {
      //   subjects: getSubjects.rows,
      //   noOfSubjects: getSubjects.rowCount,
      // }
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Get subjects failed",
    });
  }
};

// 3. get subject by id
export const getSubBYId = async (req, res) => {
  try {
    // const { name, code, dept_id } = req.body;
    // if (!name || !code || !dept_id) {
    //   res.status(400).json({
    //     message: "All fields are required",
    //   });
    // }

    const id = parseInt(req.params.id);
    const getSubject = await pool.query(
      `
           SELECT * FROM subjects WHERE id = $1 
            `,
      [id],
    );
    console.log(getSubject);
    const idExists = await pool.query("SELECT * FROM subjects WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

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

//4.  edit subject by id
export const editSubById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, code, dept_id } = req.body;

    console.log(id);


    const editSub = await pool.query(
      `UPDATE subjects SET name = COALESCE($1, name), code = COALESCE($2, code), dept_id = COALESCE($3, dept_id) WHERE id = $4 RETURNING *`,
      [name, code, dept_id, id],
    );
    console.log(editSub);

    const idExists = await pool.query("SELECT * FROM subjects WHERE id = $1", [
      id,
    ]);
    console.log("check if id exists", idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

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

//5.  delete subjects by id
export const deleteSubjectbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, code, dept_id } = req.body;
    if (!name || !code || !dept_id) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const deleteSub = await pool.query(
      `
           DELETE FROM subjects WHERE id =$1, 
            `,[id],
    );
    console.log(deleteSub);

    const idExists = await pool.query("SELECT * FROM subjects WHERE id = $1"
      [id],);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    return res.status(200).json({
      message: "Delete subjects failed",
    });
  } catch (error) {}
};
