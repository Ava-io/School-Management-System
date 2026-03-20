import { pool } from "../../config/db.js";

// create prefects

export const createPrefectService = async (req, res) => {
  try {
    // Verify prefect info
    const { student_id, status } = req.body;
    const schoolId = req.user.schoolId;
    const role = req.user.role;

    if (!student_id || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check if Prefect exists
    const prefExists = await pool.query(
      "SELECT * FROM prefects WHERE student_id = $1",
      [student_id],
    );

    if (prefExists.rows.length > 0) {
      return res.status(400).json({
        message: "Prefect already exists",
      });
    }
    console.log(prefExists);

    // Insert into prefect table
    const createPrefectQuery = `
    INSERT INTO prefects(role, student_id, status, school_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

    //  execute prefect query
    console.log(schoolId, "schID");
    console.log(role, "role");

    const prefResult = await pool.query(createPrefectQuery, [
      role,
      student_id,
      status,
      schoolId,
    ]);
    console.log(prefResult);
    const prefect = prefResult.rows[0];
    console.log("these are the prefects", prefect);

    res.status(201).json({
      message: "Prefects created successfully",
      data: {
        role: prefect.role,
        student_id: prefect.student_id,
        status: prefect.status,
        schoolId: prefect.schoolId,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create prefects",
      error: error.message,
    });
  }
};

//  get all prefects
export const getPrefects = async (req, res) => {
  try {
    const getPrefects = await pool.query(`SELECT * FROM prefects`);
    console.log(getPrefects.rows);

    return res.status(200).json({
      message: "Prefects gotten successfully",
      data: getPrefects.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Get prefects failed",
    });
  }
};

// get prefect by id
export const getPrefectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getPrefect = await pool.query(
      `
           SELECT * FROM prefects WHERE id = $1 
            `,
      [id],
    );
    console.log(getPrefect);

    const idExists = await pool.query("SELECT * FROM prefects WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Prefect not found",
      });
    }

    return res.status(200).json({
      message: "Prefects fetched successfully",
      data: {
        prefect: getPrefect.rows,
        noOfPrefects: getPrefect.rowCount,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Get prefects failed",
    });
  }
};

// update prefect by id
export const editPrefectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { student_id, status } = req.body;

    const editPrefect = await pool.query(
      `
       UPDATE prefects SET student_id = COALESCE($1, student_id), status = COALESCE($2, status) WHERE id = $3 RETURNING *
        `,
      [student_id, status, id],
    );

    const idExists = await pool.query("SELECT * FROM prefects WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Prefect not found",
      });
    }
    console.log(editPrefect);
    return res.status(200).json({
      message: "Prefect edited successfully",
      data: editPrefect.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit prefect failed",
    });
  }
};

// delete prefect by id
export const delPrefectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletePrefect = await pool.query(
      `DELETE FROM prefects WHERE id = $1`,
      [id],
    );
    console.log(deletePrefect);

    const idExists = await pool.query("SELECT * FROM prefects WHERE id = $1", [
      id,
    ]);
    if (!idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Prefect not found",
      });
    }

    return res.status(200).json({
      message: "Prefects deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Delete prefect failed",
    });
  }
};
