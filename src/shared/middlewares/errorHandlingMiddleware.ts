import { Request, Response, NextFunction } from 'express';
import errorClass from '../error';

//Error Handling Middleware
export const errorHandler = (error: errorClass, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Something Wrong Happened';
  res.status(status).send({ success: false, message });
};

//Middleware that handels the request to Not Defined Endpoints
export const lastRoute = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ success: false, message: 'Endpoint Not Found' });
};
