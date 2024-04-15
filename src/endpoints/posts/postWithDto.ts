import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class postWithDtoCreate {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @IsNotEmpty()
  image: string;
}

export class postWithDtoUpdate {
  @MinLength(3)
  title: string;

  @MinLength(3)
  description: string;

  image: string;
}
