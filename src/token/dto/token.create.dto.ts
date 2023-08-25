import { IsNotEmpty, IsString } from 'class-validator';

export class createTokenDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
