import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { sign } from 'jsonwebtoken'
import 'reflect-metadata'
import { AuthGuard } from '../common'
import { BaseController } from '../common/base.controller'
import { ValidateMiddleware } from '../common/validate.middleware'
import { ConfigService } from '../config/config.service'
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
    @inject(TYPES.IUserService) private userService: UserService,
    @inject(TYPES.ConfigService) private configService: ConfigService
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
      {
        path: '/info',
        method: 'get',
        callback: this.info,
        middlewares: [new AuthGuard()],
      },
    ])
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = await this.userService.validateUser(body)
    if (!user) {
      return next(new HttpError(401, 'Invalid email or password'))
    }
    const jwt = await this.signJWT(
      body.email,
      this.configService.get('JWT_SECRET_KEY')
    )
    return this.ok(res, { jwt })
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = await this.userService.createUser(body)

    if (!user) {
      return this.error(res, 'User already registered')
    }
    this.ok(res, user)
  }

  async info(
    { body, user: userEmail }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { password, ...rest } = await this.userService.getUser(userEmail)
    this.ok(res, rest)
  }

  private async signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        { email, iat: Math.floor(Date.now() / 1000) },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => {
          if (err) {
            reject(err)
          } else {
            resolve(token)
          }
        }
      )
    })
  }
}
