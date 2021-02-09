import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

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
      res.status(500).json({ success: false, message: err.message });
    }
  };
}
