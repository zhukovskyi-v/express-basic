import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { IRouteMiddleware } from './route.interface'

export class ValidateMiddleware implements IRouteMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToInstance(this.classToValidate, body)
    validate(instance).then((value) => {
      if (value.length) {
        return res.status(422).json(value)
      } else {
        next()
      }
    })
  }
}
