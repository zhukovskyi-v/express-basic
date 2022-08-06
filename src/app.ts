import express, { Express } from 'express'
import { Server } from 'http'
import { ExceptionFilter } from './errors'
import { LoggerService } from './logger'
import { UserController } from './users'

export class App {
  app: Express
  port: number
  server: Server

  constructor(
    public readonly logger: LoggerService,
    public readonly userController: UserController,
    public readonly exceptionFilter: ExceptionFilter
  ) {
    this.app = express()
    this.port = 9876
  }

  useRoutes() {
    this.app.use('/user', this.userController.router)
  }

  useExceptionFilters() {
    this.app.use(
      this.exceptionFilter.catch.bind(this.exceptionFilter)
    )
  }

  public async initialize() {
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Express server listening on ${this.port}`)
    })
    this.useRoutes()
    this.useExceptionFilters()
  }
}
