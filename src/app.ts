import express, { Express } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { ExceptionFilter } from './errors'
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
    public readonly exceptionFilter: ExceptionFilter
  ) {
    this.app = express()
    this.port = 9876
  }

  useRoutes() {
    this.app.use('/user', this.userController.router)
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  public async initialize() {
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Express server listening on ${this.port}`)
    })
    this.useRoutes()
    this.useExceptionFilters()
  }
}
