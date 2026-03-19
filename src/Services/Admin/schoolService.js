import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../Utils/responseHandler.js";

// 1. Create new school
export const createSchool = async (req, res) => {
  try {
    // a. verify neccessary details
    const { name, logo_url, address } = req.body;

    if (!name || !logo_url || !address) {
      res.status(400).json({
        message: "All fields required",
      });
    }

    // b. Check if school exists
    const schExists = await pool.query(
      "SELECT * FROM schools WHERE name = $1",
      [name],
    );

    if (schExists.rows.length > 0) {
      return res.status(400).json({
        message: "School already exists",
      });
    }
    console.log(schExists);

    //c. Create school query
    const createSchoolQuery = `
    INSERT INTO schools(name, logo_url, address)
     VALUES ($1, $2, $3) 
     RETURNING *
     `;

    // d. execute school query
    const schResult = await pool.query(createSchoolQuery, [
      name,
      logo_url,
      address,
    ]);

    console.log("kjhngbhj", schResult);

    const school = schResult.rows[0];
    console.log(school);

    res.status(201).json({
      message: "School created successfully",
      data: {
        schools: schResult.rows,
        noOfSchools: schResult.rowCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create school",
      error: error.message,
    });
  }
};

// // get all schools
export const getSchools = async (req, res) => {
  try {
    // 2. check if school exists

    const getSchools = await pool.query(`SELECT * FROM schools`);
    console.log(getSchools.rows);

    return res.status(200).json({
      message: "school created successfully",
      data: {
        schools: getSchools.rows,

        noOfSchools: getSchools.rowCount,
      },
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Fetch schools failed");
  }
};

// // get school by id
export const getSchById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getSchool = await pool.query(
      `
           SELECT * FROM schools WHERE id= $1 
            `,
      [id],
    );
    console.log(getSchool);

    const idExists = await pool.query("SELECT * FROM schools WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "School not found",
      });
    }

    return res.status(200).json({
      message: "School fetched successfully",
      data: {
        sch: getSchool.rows,
        noOfSchools: getSchool.rowCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Fetch School failed",
    });
  }
};

// // edit school by id
export const editSchbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, logo_url, address } = req.body;


    const editSch = await pool.query(
      `
            UPDATE schools SET name = COALESCE ($1, name), logo_url = COALESCE ($2, logo_url), 
            address = COALESCE ($3, address)
            WHERE id=$4
            RETURNING *
            `,
      [name, logo_url, address, id],
    );
    console.log(editSch);

    const idExists = await pool.query("SELECT * FROM schools WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "School not found",
      });
    }

    return res.status(200).json({
      message: "School edited successfully",
      data: editSch.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit school failed",
    });
  }
};

// // delete school by id
export const deleteSchbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteSch = await pool.query(
      `DELETE FROM schools WHERE id=$1 `,[id],
    );
    console.log(deleteSch);


    

    const idExists = await pool.query("SELECT * FROM schools WHERE id = $1", [
      id,
    ]);
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "School not found",
      });
    }

    return res.status(200).json({
      message: "Delete school successful",
    });
  } catch (error) {
    console.log(error); 
      return res.status(400).json({
        message: "Delete school failed",
      });
    }
  }

