import { pool } from "../config/db.js";
import { errorResponse, successResponse } from "../Utils/responseHandler.js";

// 1. Create assignment
export const createAssignmentService = async (req, res) => {
  try {
    // Verify needed details
    const { title, content, class_id, subject_id, due_date } = req.body;
    const schoolId = req.user.schoolId;
    const teacher_id = req.user.id;
    console.log(teacher_id)
    const filePath = req.file ? req.file.path : null;
    console.log("this is filepath", filePath);

    const idQuery = await pool.query(
      "SELECT id FROM teachers WHERE user_id = $1",
      [teacher_id],
    );
console.log("this is idQuery",idQuery);
    const raiseTeacherId = idQuery.rows[0].id; 


    if (
      !title ||
      !content ||
      !class_id ||
      !subject_id ||
      !due_date
    ) {
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
        INSERT INTO assignments(title, content, class_id, subject_id, due_date, school_id, teacher_id, filePath)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `;

    console.log(createAssQuery);
    // 4. execute assignment query
    console.log(schoolId, "schID");
    console.log(title);

    const values = [
      title,
      content,
      class_id,
      subject_id,
      due_date,
      schoolId,
      raiseTeacherId,
      filePath,
    ];

    const assResult = await pool.query(createAssQuery, values);
    console.log(assResult);

    // const assignment = assResult.rows[0];
    // console.log(assignment);

    return successResponse(
      res,
      201,

      "Assignment created succcessfully",
      assResult.rows[0],
    );
  } catch (error) {
    console.log(error);

    return errorResponse(res, 500, "Assignment not created");
  }
};

// 2. Get all assignments

export const getAssignments = async (req, res) => {
  try {
    const getAssignments = await pool.query(`SELECT * FROM assignments`);
    console.log(getAssignments.rows);

    return res.status(200).json({
      message: "All assignments gotten successfully",
      data: getAssignments.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Get assignments failed",
    });
  }
};

// 3. Get assignment by id
export const getAssById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // const { title, content, teacher_id, class_id } = req.body;
    console.log(id);

    const getAss = await pool.query(
      `
        SELECT * FROM assignments WHERE id = $1
        `,
      [id],
    );
    console.log(getAss);

    const idExist = await pool.query(
      "SELECT * FROM assignments WHERE id = $1",
      [id],
    );
    console.log("fdsd", idExist);

    if (idExist.rows.length === 0) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      message: "Assignment gotten successfully",
      data: getAss.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit assignment failed",
    });
  }
};

// 4. Update assignnment by id
export const editAssById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, teacher_id, class_id } = req.body;
    console.log(id);

    const editAss = await pool.query(
      `UPDATE assignments SET title = COALESCE($1, title), content = COALESCE($2, content), teacher_id = COALESCE($3, teacher_id), class_id = COALESCE($4, class_id) WHERE id = $5 RETURNING *`,
      [title, content, teacher_id, class_id, id],
    );
    console.log(editAss);

    const idExists = await pool.query(
      "SELECT * FROM assignments WHERE id = $1",
      [id],
    );

    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      message: "Assignment edited successfully",
      data: editAss.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit assignment failed",
    });
  }
};

// 5. Delete assignmennt by id

export const delAssById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, teacher_id, class_id } = req.body;

    if (!title || !content || !teacher_id || !class_id) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const deleteAss = await pool.query(
      `DELETE FROM assignments WHERE id = $1`,
      [id],
    );
    console.log(deleteAss);

    const idExist = await pool.query(
      "SELECT * FROM assignments WHERE id = $1",
      [id],
    );

    console.log(idExist);

    if (idExist.rows.length === 0) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }
    return res.status(200).json({
      message: "Delete assignment failed",
    });
  } catch (error) {}
};
