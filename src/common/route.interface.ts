import { NextFunction, Request, Response, Router } from 'express'

export interface IRouteMiddleware {
  execute: (request: Request, res: Response, next: NextFunction) => void
}

export interface IRouteController {
  path: string
  callback: (req: Request, res: Response, next: NextFunction) => void
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>
  middlewares?: IRouteMiddleware[]
}
