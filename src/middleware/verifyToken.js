import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const messageTemplate =
    process.env.NODE_ENV === "development" ? "Token not found" : "Unauthorized";

   try {
    // extract token from the authorization header
    console.log(req.headers.authorization,"token")
    const token = req.headers.authorization?.split(" ")[1];

    // confirm token is sent by client
    if (!token) {
      res.status(401).json({
        message: messageTemplate,
      });
    }
    // verify and decode the token
    console.log(process.env.JWT_SECRET,"error message");
    console.log(token)
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);


    const user = decodeToken.user;

    // Attach user information to the request object for further
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
   } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Something went wrong",
    });
  }
};
