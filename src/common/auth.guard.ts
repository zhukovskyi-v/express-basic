import { NextFunction, Request, Response } from 'express'
import { IRouteMiddleware } from './route.interface'

export class AuthGuard implements IRouteMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      next()
    } else {
      res.status(401).send('You are not authorized to access this resource')
    }
  }
}
