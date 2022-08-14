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

  get router(): Router {
    return this._router
  }

  public send<T>(
    res: Response,
    code: number,
    message: T
  ): Response<any, Record<string, any>> {
    res.type('application/json')
    return res.status(200).json(message)
  }

  public ok<T>(res: Response, message: T): void {
    this.send<T>(res, 200, message)
  }

  public created(res: Response): void {
    res.status(200)
  }

  public error(res: Response, message: string): void {
    res.status(422).json(message)
  }

  protected bindRoutes(routes: IRouteController[]): void {
    for (const route of routes) {
      const middleware = (route.middlewares || [])?.map((middleware) =>
        middleware.execute.bind(middleware)
      )
      const handler = route.callback.bind(this)
      const pipeline = middleware.length ? [...middleware, handler] : handler
      this.logger.log(route.method, route.path)
      this.router[route.method](route.path, pipeline)
    }
  }
}
