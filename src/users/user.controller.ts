import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../common/base.controller'
import { HttpError } from '../errors/http-error'
import { LoggerService } from '../logger'

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger)
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        callback: this.register,
      },
      {
        path: '/login',
        method: 'post',
        callback: this.login,
      },
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, 'Invalid credentials', 'LOGIN'))
  }

  register(req: Request, res: Response) {
    this.ok(res, 'register successful')
  }
}
