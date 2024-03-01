import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  timestamp?: Date;

  @ApiProperty()
  @IsOptional()
  priority: number;
}