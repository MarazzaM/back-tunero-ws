import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class DoneDTO {

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString() //keep it as a string to avoid issues
  start: Date;

  @ApiProperty()
  @IsString()
  caller: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  customer: string;
}
