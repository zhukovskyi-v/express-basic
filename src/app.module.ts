import { ContainerModule } from 'inversify'
import { App } from './app'
import { ExceptionFilter } from './errors'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { LoggerService } from './logger'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'

export const appBindings = new ContainerModule((bind) => {
  bind<App>(TYPES.Application).to(App)
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
  bind<ILogger>(TYPES.ILogger).to(LoggerService)
})
