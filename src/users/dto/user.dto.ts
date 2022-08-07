import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserLoginDto {
  @IsEmail({}, { message: 'Please enter your valid email address' })
  @IsNotEmpty()
  email: string

  @IsString({ message: 'Please enter your password' })
  @IsNotEmpty()
  password: string
}

export class UserRegisterDto {
  @IsEmail({}, { message: 'Please enter your valid email address' })
  @IsNotEmpty()
  email: string

  @IsString({ message: 'Please enter your name' })
  @IsNotEmpty()
  name: string

  @IsString({ message: 'Please enter your password' })
  @IsNotEmpty()
  password: string
}
