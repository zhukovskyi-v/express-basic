import { UserModel } from '@prisma/client'
import { compare } from 'bcryptjs'
import { inject, injectable } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../types'
import { UserLoginDto, UserRegisterDto } from './dto'
import { UserEntity } from './entity'
import { IUserRepository } from './repository/user.repository.interface'

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async createUser({
    password,
    name,
    email,
  }: UserRegisterDto): Promise<UserModel | null> {
    const existingUser = await this.userRepository.findOne(email)
    if (existingUser) {
      return null
    }
    const newUser = new UserEntity(email, name)
    const salt = this.configService.get<string>('SALT')
    await newUser.setPassword(password, salt)
    return await this.userRepository.create(newUser)
  }

  async validateUser({ password, email }: UserLoginDto): Promise<boolean> {
    const user = await this.userRepository.findOne(email)
    if (!user) {
      return false
    }
    return await compare(password, user.password)
  }
}
