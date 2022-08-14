import { ContainerModule } from 'inversify'
import { App } from './app'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { ExceptionFilter } from './errors'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { LoggerService } from './logger'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'

export const appBindings = new ContainerModule((bind) => {
  bind<App>(TYPES.Application).to(App).inSingletonScope()
  bind<IExceptionFilter>(TYPES.ExceptionFilter)
    .to(ExceptionFilter)
    .inSingletonScope()
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
})
