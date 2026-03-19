import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../Utils/responseHandler.js";

export const createAnnouncementService = async (req, res) => {
  try {
    // 1. Verify all needed details

    const { title, content } = req.body;
    const schoolId = req.user.schoolId;

    if (!title || !content) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if userExists
    const announcementExists = await pool.query(
      "SELECT * FROM announcement WHERE title = $1",
      [title],
    );
    if (announcementExists.rows.length > 0) {
      return res.status(400).json({
        message: "Announcement already exists",
      });
    }

    console.log(announcementExists);

    //    3. Insert into annoucement table
    const createAnnnouncementQuery = `
    INSERT INTO announcement(title, content)
    VALUES ($1, $2)
    RETURNING *
    `;

    // 4. execute annoucement query
    console.log(schoolId, "schID");
    console.log(title);
    const annoucementResult = await pool.query(createAnnnouncementQuery, [
      title,
      content,
    ]);
    console.log(annoucementResult);

    const announcement = annoucementResult.rows[0];
    console.log(announcement);

    return res.status(201).json({
      message: "Announcement created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create announcement",
      error: error.message,
    });
  }
};

// get all anouncements
export const getAnnouncements = async (req, res) => {
  try {
    const getAnnouncements = await pool.query(`SELECT * FROM announcement`);
    console.log(getAnnouncements.rows);

    return res.status(200).json({
      message: "announcements gotten successfully",
      data: getAnnouncements.rows,
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Fetch announcements failed");
  }
};

// get announcements by id
export const getAnnById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // const { title, content } = req.body;

    const getAnn = await pool.query(
      `
        SELECT * FROM announcement WHERE id = $1
        `,
      [id],
    );
    console.log(getAnn);

    const idExists = await pool.query(
      "SELECT * FROM announcement WHERE id = $1",
      [id],
    );
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return errorResponse(res, 404, "Announcement not found");
    }

    return res.status(200).json({
      message: "announcements gotten successfully",
      data: getAnn.rows,
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, 400, "Get announcement failed");
  }
};

// edit announcement by id

export const editAnnById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { title, content } = req.body;

    const editAnn = await pool.query(
      ` UPDATE announcement SET title = COALESCE($1, title), content = COALESCE(
        $2, content) WHERE id = $3 RETURNING * `,
      [title, content, id],
    );

    const idExists = await pool.query(
      "SELECT * FROM announcement WHERE id = $1",
      [id],
    );
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }
    console.log(editAnn);
    return res.status(200).json({
      message: "Announcement edited successfully",
      data: editAnn.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Edit announncement failed",
    });
  }
};

// delete announcement by id

export const delAnnById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // const { title, content } = req.body;
    // if (!title || !content) {
    //   res.status(400).json({
    //     message: "All fields are required",
    //   });
    // }

    const deleteAnn = await pool.query(
      `DELETE FROM announcement WHERE id=$1`,[id],
    );
    console.log(deleteAnn);

    const idExists = await pool.query(
      "SELECT * FROM announcement WHERE id = $1",
      [id],
    );
    console.log(idExists);

    if (idExists.rows.length === 0) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      message: "Annnouncement deleted successfully",
    });


    

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Delete announcement failed",
    });
  }
};
