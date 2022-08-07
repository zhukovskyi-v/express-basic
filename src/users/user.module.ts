import { ContainerModule } from 'inversify'
import { TYPES } from '../types'
import { UserController } from './user.controller'
import { IUserController } from './user.interface'
import { UserService } from './user.service'

export const userBindings = new ContainerModule((bind) => {
  bind<IUserController>(TYPES.IUserController)
    .to(UserController)
    .inSingletonScope()
  bind<UserService>(TYPES.IUserService).to(UserService).inSingletonScope()
})
