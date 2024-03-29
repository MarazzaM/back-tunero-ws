// src/articles/entities/article.entity.ts

import { Message } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class MessageEntity implements Message {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  @IsOptional()
  priority: number;
}