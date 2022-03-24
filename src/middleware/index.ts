import Express from 'express';

export const logger = (
  request: Express.Request,
  _: Express.Response,
  next: Express.NextFunction
) => {
  console.log(request.method, ' ', request.path);
  console.log('-----------');
  next();
};
