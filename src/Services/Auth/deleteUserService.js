import { pool } from "../../config/db.js";

export const deleteSchoolsService = async (req, res) => {
  try {
    const deleteAllUsers = await pool.query("DELETE FROM schools");
    console.log(deleteAllUsers);

    res.status(200).json({
      message: "Users deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Deletion failed", error,
    });
  }
};

export const deleteSchoolsByIdService = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deleteSchool = await pool.query("DELETE FROM schools WHERE id = $1", [
      id,
    ]);
    console.log(deleteSchool);
    return res.status(200).json({
      message: "School deleted by id successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "School not deleted",
    });
  }
};
