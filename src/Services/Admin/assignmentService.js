import { pool } from "../../config/db.js";

// 1. Create assignment
export const createAssignmentService = async (req, res) => {
  try {
    // Verify needed details
    const { title, content, teacher_id, class_id } = req.body;
    const schoolId = req.user.schoolId;

    if (!title || !content || !teacher_id || !class_id) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    //  Check if assignment exists
    const assExists = await pool.query(
      "SELECT * FROM assignments WHERE title = $1",
      [title],
    );

    if (assExists.rows.length > 0) {
      return res.status(400).json({
        message: "Assignnment already exists",
      });
    }
    console.log(assExists);

    // 3. Insert into assignment Tables
    const createAssQuery = `
        INSERT INTO assignments(title, content, teacher_id, class_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;

        console.log(createAssQuery);
    // 4. execute assignment query
    console.log(schoolId, "schID");
    console.log(title);

    const assResult = await pool.query(createAssQuery, [
      title,
      content,
      teacher_id,
      class_id,
    ]);
    console.log(assResult);

    const assignment = assResult.rows[0];
    console.log(assignment);

    return res.status(500).json({
      message: "Failed to create assignment",
      error: error.message,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create assignment",
      error: error.message,
    });
  }
};
