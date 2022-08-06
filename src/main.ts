import { Container } from 'inversify'
import 'reflect-metadata'
import { App } from './app'
import { appBindings } from './app.module'
import { TYPES } from './types'
import { userBindings } from './users/user.module'

export const bootstrap = () => {
  const appContainer = new Container()
  appContainer.load(appBindings, userBindings)
  const app = appContainer.get<App>(TYPES.Application)

  app.initialize()
  return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
