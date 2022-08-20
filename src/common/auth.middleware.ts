import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { IRouteMiddleware } from './route.interface'

export class AuthMiddleware implements IRouteMiddleware {
  constructor(private readonly secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      verify(token, this.secret, (err, result) => {
        if (err) {
          next()
        } else if (result) {
          console.log('result: ' + JSON.stringify(result))
          req.user = (result as JwtPayload).email
          next()
        }
      })
    } else {
      next()
    }
  }
}
