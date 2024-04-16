import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginWithDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
