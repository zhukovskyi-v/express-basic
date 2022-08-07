import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { IExceptionFilter } from './exception.filter.interface'
import { HttpError } from './http-error'

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (error instanceof HttpError) {
      this.logger.error(
        `[${error.context}] Error ${error.message}`,
        req,
        res,
        next
      )
      res.status(error.statusCode).send({ error })
    } else {
      this.logger.error(error.message)
      res.status(500).send({ error: error.message })
    }
  }
}
