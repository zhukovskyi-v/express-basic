import { hash } from 'bcryptjs'

export class UserEntity {
  private _password: string

  constructor(
    private readonly _email: string,
    private readonly _name: string
  ) {}

  public async setPassword(password: string, salt: string): Promise<void> {
    this._password = await hash(password, +salt)
  }

  get email(): string {
    return this.email
  }

  get password(): string {
    return this._password
  }

  get name(): string {
    return this.name
  }
}
