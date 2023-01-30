import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly nickname: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  readonly name: string;
}
