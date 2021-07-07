import { AnyARecord } from 'dns';
import { NextFunction, Response, Request } from 'express';
import LoggerInstance from '../../loaders/logger';
import errorClass from '../error';
import { verifyJwt } from '../services/jwtService';
import { UserPayload } from '../customTypes';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) throw Error('Invalid Request');
    const payload: UserPayload = await verifyJwt(token);
    req.user = payload;
    next();
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('User not Authorized', 401));
  }
};
