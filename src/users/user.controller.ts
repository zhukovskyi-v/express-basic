import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { BaseController } from '../common/base.controller'
import { HttpError } from '../errors/http-error'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { IUserController } from './user.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
    super(loggerService)
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
