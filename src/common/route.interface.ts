import { NextFunction, Request, Response, Router } from 'express'

export interface IRouteController {
  path: string
  callback: (req: Request, res: Response, next: NextFunction) => void
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>
}
