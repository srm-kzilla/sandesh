import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { decryptData, encryptData } from '../../shared/services/encryptionService';
import { ObjectId } from 'bson';
import { KeyWithDecipher } from '../../shared/customTypes';
import { Key } from './schema';

function decryptKey(keys) {
  return { _id: keys._id, user: keys.user, key: decryptData(keys.key), isEnabled: keys.isEnabled };
}

const nanoid = customAlphabet(urlAlphabet, 16);

export const generateKey = async (user: string): Promise<string> => {
  try {
    const foundUser = await (await database()).collection('keys').findOne({ user });
    if (foundUser) throw Error('User already exists');
    const keyString = await nanoid();

    const newKey: KeyWithDecipher = {
      user: user,
      key: encryptData(keyString),
      isEnabled: true,
    };

    await (await database()).collection('keys').insertOne(newKey);
    return keyString;
  } catch (error: any) {
    LoggerInstance.error(error);
    if (error.message === 'User already exists') throw { code: 409, message: 'User already exists' };
    throw Error('Error-' + error.message);
  }
};

export const toggleKey = async (_id: string, isEnabled: boolean): Promise<void> => {
  try {
    await (await database())
      .collection('keys')
      .updateOne({ _id: new ObjectId(_id) }, { $set: { isEnabled: isEnabled } });
  } catch (error: any) {
    LoggerInstance.error(error);
    throw Error('Error-' + error.message);
  }
};

export const resetKey = async (_id: string): Promise<string> => {
  try {
    const newKeyString = await nanoid();
    const key = encryptData(newKeyString);
    await (await database()).collection('keys').updateOne({ _id: new ObjectId(_id) }, { $set: { key } });
    return newKeyString;
  } catch (error: any) {
    LoggerInstance.error(error);
    throw Error('Error-' + error.message);
  }
};

export const fetchKeys = async (): Promise<Key[]> => {
  try {
    const allKeys = await (await database()).collection('keys').find({}).toArray();
    return allKeys.map(decryptKey);
  } catch (error: any) {
    LoggerInstance.error(error);
    throw Error('Error-' + error.message);
  }
};
export const deleteKey = async (_id: string): Promise<void> => {
  try {
    const key = await (await database()).collection('keys').findOne({ _id: new ObjectId(_id) });
    if (!key) throw Error('Key does not exist');
    else await (await database()).collection('keys').findOneAndDelete({ _id: new ObjectId(_id) });
  } catch (error: any) {
    LoggerInstance.error(error);
    if (error.message === 'Key does not exist') throw { code: 404, message: 'Key does not exist' };
    throw Error('Error-' + error.message);
  }
};
