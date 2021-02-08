import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { Userinfo } from '../../shared/customTypes';
import config from '../../config';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (body: Userinfo) => {
  try {
    const databaseResponse = await (await database()).collection('user').findOne({ email: body.email });
    if (databaseResponse !== null) throw Error('User already Exists');
    const hashedPassword = await hash(body.password, 10);
    body.password = hashedPassword;
    await (await database()).collection('user').insertOne(body);
  } catch (error) {
    LoggerInstance.error(error);
    throw { code: 500, message: error.message };
  }
};

export const userLogin = async (email: string, password: string) => {
  try {
    const databaseResponse = await (await database()).collection('user').findOne({ email: email });
    if (databaseResponse === null) throw Error('User does not exist');
    if (!(await compare(password, databaseResponse.password))) throw Error("Password doesn't match");
    const accessToken = jwt.sign(JSON.stringify(databaseResponse), config.jwtSecret);
    return accessToken;
  } catch (error) {
    LoggerInstance.error(error);
    throw { code: 403, message: 'User is not authorized' };
  }
};
