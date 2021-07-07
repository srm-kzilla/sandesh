import { sign, verify } from 'jsonwebtoken';

export const signJwt = async (payload: any, options?: any) => {
  options = options !== undefined ? options : {};
  return await sign(payload, process.env.JWT_SECRET, options);
};

export const verifyJwt = async (token: string): Promise<any> => {
  return await verify(token, process.env.JWT_SECRET);
};
