import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DoneService } from './done.service';
import { DoneDTO } from './dto/done.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('done')
@ApiTags('done')
export class DoneController {
  constructor(private readonly doneService: DoneService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  create(@Body() DoneDTO: DoneDTO) {
    return this.doneService.create(DoneDTO);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll() {
    return this.doneService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.doneService.findOne(+id);
  }
  
  @Get('/last/:type')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findLastByType(@Param('type') type: string) {
    return this.doneService.findLastByType(type);
  }
  
}
