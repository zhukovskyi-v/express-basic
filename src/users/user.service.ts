import { inject, injectable } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../types'
import { UserRegisterDto } from './dto'
import { UserEntity } from './entity'

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}

  async createUser({
    password,
    name,
    email,
  }: UserRegisterDto): Promise<UserEntity> {
    const newUser = new UserEntity(email, name)
    const salt = this.configService.get<string>('SALT')
    await newUser.setPassword(password, salt)
    return newUser
  }
}
