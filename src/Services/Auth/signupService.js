import { pool } from "../../config/db.js";
import { generatePassword } from "../../Utils/generatePassword.js";
import bcrypt from "bcrypt";



const SignupService = async (req, res) => {
  // schools Table => school name, address, logo url,
  // Users Table => email, password, role

  const client = await pool.connect();

  try {
    console.log(req.body);
    const { schoolName, address, logoUrl, email } = req.body;

    //creating school

    if (!schoolName || !address || !logoUrl || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  to avoid duplicate email from signing up
    const emailExists = await pool.query(
      "SELECT * FROM users WHERE email = $1 ",
      [email],
    );
    if (emailExists.rows.length != 0) {
      console.log(emailExists);
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // start transaction
    await client.query("BEGIN");

    // creating school query
    const createSchoolQuery = `
    INSERT INTO schools (name, address, logo_url)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    // execute school query
    const schoolResult = await client.query(createSchoolQuery, [
      schoolName,
      address,
      logoUrl,
    ]);

    // extract school id
    console.log("school result", schoolResult.rows);
    const schoolId = schoolResult.rows[0].id;
    const schoolInfo = schoolResult.rows[0];
    console.log(schoolInfo);

    // Create user
    const password = generatePassword(schoolName);
    const role = "admin";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.warn("this is user password", password);
    // create user query
    const createUserQuery = `
    INSERT INTO users(school_id, email, password, role)
    VALUES ($1, $2, $3, $4)  
    RETURNING *                                                                                                                                                                                                                                                                                                                                                                                   
    `;

    // execute user query

    console.log(schoolId, "schID");
    console.log(email);
    const userResult = await client.query(createUserQuery, [
      schoolId,
      email,
      hashedPassword,
      role,
    ]);
    console.log(userResult);
    const admin = userResult.rows[0];
    console.log(admin);

    //Commit Trannsaction
    await client.query("COMMIT");
    res.status(201).json({
      message: "Signup successful",
      data: {
        schoolName: schoolInfo.name,
        address: schoolInfo.address,
        logoUrl: schoolInfo.logo_url,
        email: admin.email,
      },
    });
    // create a school query
  } catch (error) {
    //rollback transaction
    await client.query("ROLLBACK");
    console.log(error);

    return res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};

export default SignupService;
