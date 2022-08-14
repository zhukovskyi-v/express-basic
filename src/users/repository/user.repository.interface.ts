import { UserModel } from '@prisma/client'
import { UserEntity } from '../entity'

export interface IUserRepository {
  create: (user: UserEntity) => Promise<UserModel>
  find(email?: string, name?: string): Promise<UserModel[]>
  findOne(email?: string, name?: string): Promise<UserModel | null>
}
