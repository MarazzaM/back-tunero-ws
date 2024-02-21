import { ApiProperty } from '@nestjs/swagger';

export class DoneDTO {

  @ApiProperty()
  number: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  caller: string;

  @ApiProperty()
  customer: string;
}