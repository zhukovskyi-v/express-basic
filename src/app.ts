import express, { Express } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { UserController } from './users'

@injectable()
export class App {
  app: Express
  port: number
  server: Server

  constructor(
    @inject(TYPES.ILogger) public readonly logger: ILogger,
    @inject(TYPES.IUserController)
    public readonly userController: UserController,
    @inject(TYPES.ExceptionFilter)
    public readonly exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService)
    public readonly configService: IConfigService,
    @inject(TYPES.PrismaService)
    public readonly prismaService: PrismaService
  ) {
    this.app = express()
    this.port = 9876
  }

  useRoutes(): void {
    this.app.use('/user', this.userController.router)
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  useMiddleware(): void {
    this.app.use(express.json())
  }

  public async initialize(): Promise<void> {
    this.useMiddleware()
    this.useRoutes()
    this.useExceptionFilters()
    await this.prismaService.connect()
    this.server = this.app.listen(this.port, () => {
      this.logger.log(
        `Express server listening on http://localhost:${this.port}`
      )
    })
  }
}
