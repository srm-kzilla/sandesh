import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { decryptData, encryptData } from '../../shared/services/encryptionService';
import { Key } from '../../shared/customTypes';

function decryptKey(info) {
  return [info.user, decryptData(info.key), info.isEnabled];
}

const nanoid = customAlphabet(urlAlphabet, 16);

export const generateKey = async (user: string): Promise<string> => {
  try {
    const foundUser = await (await database()).collection('keys').findOne({ user });
    if (foundUser) throw Error('User already exists');
    const keyString = await nanoid();

    const newKey: Key = {
      user: user,
      key: encryptData(keyString),
      isEnabled: true,
    };

    await (await database()).collection('keys').insertOne(newKey);
    return keyString;
  } catch (error) {
    LoggerInstance.error(error);
    if (error.message === 'User already exists') throw { code: 409, message: 'User already exists ' };
    throw Error('Error-' + error.message);
  }
};

export const toggleKey = async (user: string, isEnabled: boolean): Promise<void> => {
  try {
    await (await database()).collection('keys').updateOne({ user }, { $set: { isEnabled } });
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Error-' + error.message);
  }
};

export const resetKey = async (user: string): Promise<string> => {
  try {
    const newKeyString = await nanoid();
    const key = encryptData(newKeyString);
    await (await database()).collection('keys').updateOne({ user }, { $set: { key } });
    return newKeyString;
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Error-' + error.message);
  }
};

export const fetchKeys = async (): Promise<string[][]> => {
  try {
    const allKeys = await (await database())
      .collection('keys')
      .find({}, { projection: { _id: 0 } })
      .toArray();
    return allKeys.map(decryptKey);
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Error-' + error.message);
  }
};
export const deleteKey = async (user: string): Promise<void> => {
  try {
    const key = await (await database()).collection('keys').findOne({ user });
    if (!key) throw Error('Key does not exist');
    await (await database()).collection('keys').findOneAndDelete({ user });
  } catch (error) {
    LoggerInstance.error(error);
    if (error.message === 'Key does not exist') throw { code: 404, message: 'Key does not exist' };
    throw Error('Error-' + error.message);
  }
};
