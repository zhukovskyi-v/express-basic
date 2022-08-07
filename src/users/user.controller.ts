import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { BaseController } from '../common/base.controller'
import { ValidateMiddleware } from '../common/validate.middleware'
import { HttpError } from '../errors/http-error'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { UserLoginDto, UserRegisterDto } from './dto'
import { IUserController } from './user.interface'
import { UserService } from './user.service'

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IUserService) private userService: UserService
  ) {
    super(loggerService)
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        callback: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/login',
        method: 'post',
        callback: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
    ])
  }

  login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): void {
    next(new HttpError(401, 'Invalid credentials', 'LOGIN'))
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = await this.userService.createUser(body)
    this.ok(res, user)
  }
}
