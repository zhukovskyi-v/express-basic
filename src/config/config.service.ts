import { config, DotenvParseOutput } from 'dotenv'
import { inject, injectable } from 'inversify'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { IConfigService } from './config.service.interface'

@injectable()
export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput

  constructor(@inject(TYPES.ILogger) logger: ILogger) {
    const result = config()
    if (result.error) {
      logger.error('ConfigService error: ' + result.error)
    } else {
      this.config = result.parsed
    }
  }

  get<T extends number | string>(key: string): T {
    return this.config[key] as T
  }
}
