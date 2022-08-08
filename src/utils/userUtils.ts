import bcrypt from "bcrypt";

const userUtils = {
  hashData: (data: string) => {
    const saltRounds = process.env.SALT_ROUNDS || 10;

    return bcrypt.hashSync(data, saltRounds);
  },

  compareData: (data: string, hash: string) => {
    return bcrypt.compareSync(data, hash);
  }
};

export default userUtils;
