import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

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
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  color: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  colorBg: string;
}