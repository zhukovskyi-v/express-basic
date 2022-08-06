import { NextFunction, Request, Response } from 'express'
import { LoggerService } from '../logger'
import { IExceptionFilter } from './exception.filter.interface'
import { HttpError } from './http-error'

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService

  constructor(logger: LoggerService) {
    this.logger = logger
  }

  catch(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
