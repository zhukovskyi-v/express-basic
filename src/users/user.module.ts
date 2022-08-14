import { ContainerModule } from 'inversify'
import { TYPES } from '../types'
import { UserRepository } from './repository'
import { IUserRepository } from './repository/user.repository.interface'
import { UserController } from './user.controller'
import { IUserController } from './user.interface'
import { UserService } from './user.service'

export const userBindings = new ContainerModule((bind) => {
  bind<IUserController>(TYPES.IUserController)
    .to(UserController)
    .inSingletonScope()
  bind<UserService>(TYPES.IUserService).to(UserService).inSingletonScope()
  bind<IUserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope()
})
