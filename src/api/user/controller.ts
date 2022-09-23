import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { compare, hash } from 'bcrypt';
import { signJwt } from '../../shared/services/jwtService';
import { User, UserDesigation, UserDomain } from '../../shared/customTypes';

export const createUser = async (
  name: string,
  domain: string,
  designation: string,
  email: string,
  password: string,
) => {
  try {
    const databaseResponse = await (await database()).collection('user').findOne({ email: email });
    if (databaseResponse !== null) throw Error('User already exists');
    const newUser: User = {
      name: name,
      domain: domain as UserDomain,
      designation: designation as UserDesigation,
      email: email,
      password: await hash(password, 14),
    };
    await (await database()).collection('user').insertOne(newUser);
  } catch (error: any) {
    LoggerInstance.error(error);
    if (error.message === 'User already exists') throw { code: 409, message: 'User already exists in the database' };
    throw { code: 500, message: error.message };
  }
};

export const userLogin = async (email: string, password: string) => {
  try {
    const databaseResponse = await (await database()).collection('user').findOne({ email: email });
    if (databaseResponse === null) throw Error('User does not exist');
    if (!(await compare(password, databaseResponse.password))) throw Error('Invalid credentials');
    return await signJwt({ email: email, name: databaseResponse.name });
  } catch (error: any) {
    LoggerInstance.error(error);
    throw { code: 403, message: 'User is not authorized' };
  }
};
