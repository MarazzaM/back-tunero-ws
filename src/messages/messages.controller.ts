import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('messages')
@ApiTags('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  create(@Body() CreateMessageDto: CreateMessageDto) {
    return this.messagesService.create(CreateMessageDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('/next')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findPriorityMessage() {
    return this.messagesService.findPriorityMessage();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.messagesService.delete(+id);
  }

}
