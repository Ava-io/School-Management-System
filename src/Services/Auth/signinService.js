import { pool } from "../../config/db.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../../Utils/generateToken.js";

// first, you check the params of what you want to work on that is what
// the front end will send. and that is email and password in this instance.

const SigninService = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    //   to check if the inputs have bee filled
    if (!email || !password) {
      res.status(400).json({
        message: "All fields are required",
      });
    }
    //  to check if the credentials are valid.
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    console.log("Check pg response:", userExists);
    if (userExists.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //   to save the responnse from postgres as a variable
    const user = userExists.rows[0];
    console.log(user);

    // to check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    console.table([user.email, user.password, password]);

    console.log("Check pg response", userExists);

    // bcrypt compare is to compare the users password to the hashed password by bcrypt
    console.log("is match?", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //   After passing all checks.
    // generate token

    const token = generateJwtToken(user.id, user.school_id, user.role);

    return res.status(200).json({
      message: "Login Successfully",
      data: {
        token: token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          schoolId: user.school_id,
        },
      },
    });

    //    After passing all checks
    //    generate token
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Signin Failed",
    });
  }
};

export default SigninService;
