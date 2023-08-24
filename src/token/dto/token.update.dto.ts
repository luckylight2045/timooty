import { IsOptional, IsString } from 'class-validator';

export class updateTokenDTO {
  @IsString()
  price: string;
}
