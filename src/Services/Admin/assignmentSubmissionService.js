import { pool } from "../../config/db.js";

// create submission
export const createSubmissionService = async (req, res) => {
  try {
    //  Verify all needed details

    const { student_id, subject_id, class_id, teacher_id, assignment_id } =
      req.body;
    const schoolId = req.user.schoolId;

    if (
      !student_id ||
      !subject_id ||
      !class_id ||
      !teacher_id ||
      !assignment_id
    ) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    // check if submission exists
    const subExists = await pool.query(
      "SELECT * FROM submission WHERE student_id = $1",
      [student_id],
    );

    if (submissionExists.rows.length > 0) {
      return res.status(400).json({
        message: "Submission already exists",
      });
    }

    console.log(submissionExists);

    // insert into assignment tables
    const createSubmissionQuery = `
    INSERT INTO submission(student_id, subject_id, class_id, teacher_id, assignment_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;

    console.log(createSubmissionQuery);

    // execute submission query
    console.log(schoolId, "schID");
    console.log(student_id);

    const submissionResult = await pool.query(createSubmissionQuery, [
      student_id,
      subject_id,
      class_id,
      teacher_id,
      assignment_id,
    ]);
    console.log(submissionResult);

    const submission = submissionResult.rows[0];
    console.log(submission);

    return res.status(201).json({
      message: "Submission created successfully",
      data: submissionResult.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "failed to create submission",
      error: error.message,
    });
  }
};
