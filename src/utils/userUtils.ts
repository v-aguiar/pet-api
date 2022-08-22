import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "12h";

const userUtils = {
  hashData: (data: string) => {
    const saltRounds = process.env.SALT_ROUNDS || 10;

    return bcrypt.hashSync(data, saltRounds);
  },

  compareData: (data: string, hash: string) => {
    return bcrypt.compareSync(data, hash);
  },

  generateToken: (id: number) => {
    return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: EXPIRES_IN });
  },

  verifyToken: (token: string) => {
    jwt.verify(token, JWT_SECRET, (error, data) => {
      if (error) {
        throw {
          name: "expiredToken",
          message: "⚠ Token expired, new login required..."
        };
      }
    });
    return jwt.decode(token) as DecodedToken;
  }
};

export default userUtils;
