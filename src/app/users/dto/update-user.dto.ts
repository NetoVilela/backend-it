import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
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
}
