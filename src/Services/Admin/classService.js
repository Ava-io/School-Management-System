import { pool } from "../../config/db.js";

// Create Class
export const createClassService = async (req, res) => {
  try {
    const { name, dept_id } = req.body;
    const schoolId = req.user.schoolId;

    if (!name || !dept_id) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const classExists = await pool.query(
      "SELECT * FROM classes WHERE name = $1",
      [name],
    );
    console.log("check if class exist", classExists);
    if (classExists.rows.length > 0) {
      return res.status(400).json({
        message: "Class already exists",
      });
    }

    const createClassQuery = `
        INSERT INTO classes(name, dept_id)
        VALUES ($1, $2)
        RETURNING *
        `;

    console.log(schoolId, "schID");
    console.log(name);
    const classResult = await pool.query(createClassQuery, [name, dept_id]);
    console.log(classResult);

    const cls = classResult.rows[0];
    console.log(cls);

    return res.status(201).json({
      message: "Class created successfully",
      data: classResult.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create class",
      error: error.message,
    });
  }
};

// get all classes
export const getClass = async (req, res) => {
  try {
    const getClass = await pool.query(`SELECT * FROM classes`);
    console.log(getClass.rows);

    return res.status(200).json({
      message: "All classes gotten successfully",
      data: getClass.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Get classes failed",
    });
  }
};

// get class by id

export const getClassById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getClass = await pool.query(
      `
            SELECT * FROM classes WHERE id = $1
            `,
      [id],
    );
    console.log(getClass);

    const idExists = await pool.query("SELECT * FROM classes WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    return res.status(200).json({
      message: "Class fetched successfully",
      data: {
        cls: getClass.rows,
        totalCls: getClass.rowCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Get class failed",
    });
  }
};

//  edit class by id

export const editClassbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, dept_id } = req.body;
    console.log(id);
    const editClass = await pool.query(
      `UPDATE classes SET name = COALESCE($1, name), dept_id = COALESCE($2, dept_id) WHERE id = $3 RETURNING *`,
      [name, dept_id, id],
    );
    console.log(editClass);

    const idExists = await pool.query("SELECT * FROM classes WHERE id = $1", [
      id,
    ]);
    console.log("vfcd", idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    return res.status(200).json({
      message: "Class edited successfully",
      data: editClass.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit subject failed",
    });
  }
};

// delete class by id

export const delclassbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, dept_id } = req.body;

    if (!name || !dept_id) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const deleteClass = await pool.query(`DELETE FROM classes WHERE id = $1`, [
      id,
    ]);
    console.log(deleteClass);

    const idExists = await pool.query(
      "SELECT * FROM classes WHERE id = $1"[id],
    );
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Class not found",
      });
    }
    return res.status(200).json({
      message: "Delete class failed",
    });
  } catch (error) {}
};
