import { pool } from "../config/db.js";

// create Department
export const createDepartmentService = async (req, res) => {
  try {
    // 1. Verify all needed details
    const { name } = req.body;
    const schoolId = req.user.schoolId;

    if (!name) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if department name exists
    const deptExists = await pool.query(
      "SELECT * FROM departments WHERE name = $1",
      [name],
    );
    if (deptExists.rows.length > 0) {
      return res.status(400).json({
        message: "Department already exists",
      });
    }
    console.log(deptExists);

    // 3. Create department query
    const createDepartmentQuery = `
    INSERT INTO departments(name)
    VALUES ($1)
    RETURNING *
    `;

    // 4. Execute department query
    console.log(schoolId, "schID");
    console.log(name);
    const deptResult = await pool.query(createDepartmentQuery, [name]);
    console.log(deptResult);

    return res.status(201).json({
      message: "Department created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create department",
      error: error.message,
    });
  }
};

// get all department in a school
export const getDepartments = async (req, res) => {
  try {
    const getDepartments = await pool.query(`SELECT * FROM departments`);
    console.log(getDepartments.rows);

    return res.status(200).json({
      message: "All departments gotten successfully",
      data: getDepartments.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Get departments failed",
    });
  }
};

// get department by id
export const getDeptbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getDepartment = await pool.query(
      `
           SELECT * FROM departments WHERE id = $1 
            `,
      [id],
    );
    console.log(getDepartment);

    return res.status(200).json({
      message: "Department fetched successfully",
      data: {
        dept: getDepartment.rows,
        noOfDepartments: getDepartment.rowCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Get Department failed",
    });
  }
};

// edit department by id
export const editDeptbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const editDept = await pool.query(
      `
            UPDATE departments SET name=$1
            WHERE id=$2
            RETURNING *`,
      [name, id],
    );

    console.log(editDept);

    const idExists = await pool.query(
      "SELECT * FROM departments WHERE id = $1",
      [id],
    );
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Department edited successfully",
      data: editDept.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit department failed",
    });
  }
};

// delete department by id
export const deletedeptbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedept = await pool.query(
      `
            DELETE FROM departments WHERE id=$1
            `,
      [id],
    );
    console.log("dxftgyui", deletedept);

    const idExists = await pool.query(
      "SELECT * FROM departments WHERE id = $1",
      [id],
    );
    console.log("ID EXIXTA RES", idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    return res.status(200).json({
      message: "Delete department failed",
    });
  }
};
