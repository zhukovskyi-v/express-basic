import { Response, Router } from 'express'
import { injectable } from 'inversify'
import 'reflect-metadata'
import { ILogger } from '../logger/logger.interface'
import { IRouteController } from './route.interface'

@injectable()
export abstract class BaseController {
  private readonly _router: Router

  constructor(private readonly logger: ILogger) {
    this._router = Router()
  }

  get router() {
    return this._router
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/json')
    return res.status(200).json(message)
  }

  public ok<T>(res: Response, message: T) {
    this.send<T>(res, 200, message)
  }

  public created(res: Response) {
    res.status(200)
  }

  protected bindRoutes(routes: IRouteController[]): void {
    for (const route of routes) {
      const handler = route.callback.bind(this)
      this.logger.log(route.method, route.path)
      this.router[route.method](route.path, handler)
    }
  }
}
