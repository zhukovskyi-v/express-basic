import { UserModel } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { PrismaService } from '../../database/prisma.service'
import { TYPES } from '../../types'
import { UserEntity } from '../entity'
import { IUserRepository } from './user.repository.interface'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}

  async create({ password, email, name }: UserEntity): Promise<UserModel> {
    return await this.prismaService.client.userModel.create({
      data: {
        email,
        name,
        password,
      },
    })
  }

  async find(email?: string, name?: string): Promise<UserModel[]> {
    if (email) {
      return await this.prismaService.client.userModel.findMany({
        where: {
          email: email,
        },
      })
    } else {
      return await this.prismaService.client.userModel.findMany({
        where: {
          name: name,
        },
      })
    }
  }

  async findOne(email?: string, name?: string): Promise<UserModel | null> {
    if (email) {
      return await this.prismaService.client.userModel.findFirst({
        where: {
          email,
        },
      })
    } else {
      return await this.prismaService.client.userModel.findFirst({
        where: {
          name,
        },
      })
    }
  }
}
