import { pool } from "../../config/db.js";

// Create submission
export const createSubmissionService = async (req, res) => {
  try {
    // Verify needed details
    const { assignment_id, student_id, status, content, filepath, school_id } =
      req.body;

    if (
      !assignment_id ||
      !student_id ||
      !status ||
      !content ||
      !filepath ||
      !school_id
    ) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const submissionExists = await pool.query(
      "SELECT * FROM submission WHERE student_id = $2",
      [student_id],
    );
    if (submissionExists.rows.length > 0) {
      return res.status(400).json({
        message: "Submission already exists ",
      });
    }

    console.log(submissionExists);

    const createSubmissionQuery = `
    INSERT INTO submission(assignment_id, student_id, status, content, filepath, school_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;

    console.log(createSubmissionQuery);

    console.log(content);

    const submissionResult = await pool.query(createSubmissionQuery, [
      assignment_id,
      student_id,
      status,
      content,
      filepath,
      school_id,
    ]);

    console.log(submissionResult);

    const submission = submissionResult.rows[0];
    console.log(submission);

    return res.status(201).json({
      message: "Assignment submitted successfully",
      data: submissionResult.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Assignment not submitted",
      error: error.message,
    });
  }
};

// Get all submissions
export const getSubmissions = async (req, res) => {
  try {
    const getSubmissions = await pool.query(`SELECT * FROM submission`);
    console.log(getSubmissions.rows);

    return res.status(200).json({
      message: "All submissions gotten successfully",
      data: getSubmissions.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Get submissions failed",
    });
  }
};

// // Get submission by id
// export const getSubmissionById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);

//     console.log(id);
//     const idExist = await pool.query("SELECT * FROM submission WHERE id = $1", [
//       id,
//     ]);

//     console.log(idExist);

//     if (idExist.rows.length === 0) {
//       return res.status(404).json({
//         message: "Submission not found",
//       });
//     }

//     const getSubmission = await pool.query(
//       `
//           SELECT * FROM submission WHERE id = $1
//             `,
//       [id],
//     );
//     console.log("get submissio res", getSubmission);

//     return res.status(200).json({
//       message: "Submission gotten successfully",
//       data: {
//         submission: getSubmission.rows,
//         noOfSubmissions: getSubmission.rowCount,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       message: "Edit Submission failed",
//     });
//   }
// };
