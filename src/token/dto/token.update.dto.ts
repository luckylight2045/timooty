import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateTokenDTO {
  @ApiProperty()
  @IsNumber()
  price: string;
}
