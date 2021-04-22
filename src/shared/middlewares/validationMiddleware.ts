import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import errorClass from '../error';

type RequestLocation = 'query' | 'body';

export function requestValidation(location: RequestLocation, schema: yup.AnyObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let _location: any;
    switch (location) {
      case 'query':
        _location = req.query;
        break;
      case 'body':
        _location = req.body;
    }
    try {
      await schema.validate(_location);
      next();
    } catch (err) {
      next(new errorClass(err.message, 500));
    }
  };
}
