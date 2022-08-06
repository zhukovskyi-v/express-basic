import { ContainerModule } from 'inversify'
import { TYPES } from '../types'
import { UserController } from './user.controller'
import { IUserController } from './user.interface'

export const userBindings = new ContainerModule((bind) => {
  bind<IUserController>(TYPES.IUserController).to(UserController)
})
