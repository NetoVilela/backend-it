import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  profile: number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateBirth: Date;

  file: File;
}
