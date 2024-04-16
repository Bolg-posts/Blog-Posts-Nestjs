import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class userWithDtoCreate {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  // @IsArray()
  // @IsString({ each: true })
  // posts: [string];
}

export class userWithDtoUpdate {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @MinLength(8)
  password: string;

  // @IsArray()
  // @IsString({ each: true })
  // posts: [string];
}
