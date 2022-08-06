import { App } from './app'
import { ExceptionFilter } from './errors'
import { LoggerService } from './logger'
import { UserController } from './users'

async function bootstrap() {
  const logger = new LoggerService()
  const app = new App(
    logger,
    new UserController(logger),
    new ExceptionFilter(logger)
  )
  await app.initialize()
}

bootstrap()
