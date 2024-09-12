import * as bcrypt from 'bcrypt';

export const encodePassword = async (rawPassword: string): Promise<string> => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
};

export const comparePasswrod = async (
  rawPassword: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compareSync(rawPassword, hash);
};
