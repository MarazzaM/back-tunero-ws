import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  timestamp?: Date;
}