import { pool } from "../../config/db.js";




// get all schools
export const getSchools = async (req, res) => {
  try {
    const getSchools = await pool.query(`SELECT * FROM schools`);
    console.log(getSchools.rows);

    return res.status(200).json({
      message: "All schools gotten successfully",
      data: getSchools.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Get schools failed",
    });
  }
};

// get school by id
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

// edit school by id
export const editSchbyId = async (req, res) => {
  try {
    const id = parseIn(req.params.id);
    const editSch = await pool.query(
      `
            UPDATE schools SET name=$1
            WHERE id=$2
            RETURNING *
            `,
      [name, id],
    );
    console.log(editSch);

    return res.status(200).json({
      message: "School edited successfully",
      data: editSch,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit school failed",
    });
  }
};

// delete school by id
export const deleteSchbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteSch = await pool.query(
      `
           DELETE FROM schools WHERE id=$1, 
            `[id],
    );
    console.log(deleteSch);

    return res.status(200).json({
      message: "Delete school failed",
    });
  } catch (error) {}
};
