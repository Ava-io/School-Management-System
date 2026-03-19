import { pool } from "../../config/db.js";

export const createAnnouncementService = async (req, res) => {

    try {
        // 1. Verify all needed details

        const { title, content} = req.body;
        const schoolId = req.user.schoolId;

        if (!title || !content)  {
            res.status(400).json({
                message: "All fields are required",
            });
        }

        // 2. Check if userExists
        const announcementExists = await pool.query(
            "SELECT * FROM users WHERE title = $1",
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
    const annoucementResult = await pool.query(createAnnnouncementQuery, [title, content]);
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