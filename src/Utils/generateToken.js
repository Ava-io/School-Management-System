import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateJwtToken = (userId, schoolId, role) => {
  const secret = process.env.JWT_SECRET;

  const payload = {
    user: {
      id: userId,
      schoolId: schoolId,
      role: role,
    },
  };

  return jwt.sign(payload, secret, { expiresIn:"24h"} );
};
