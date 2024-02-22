import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class TipoAtencionDTO {

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  priority: number;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty()
  @IsBoolean()
  active: boolean;
  
}