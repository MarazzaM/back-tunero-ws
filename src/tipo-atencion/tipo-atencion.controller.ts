import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TipoAtencionService } from './tipo-atencion.service';
import { TipoAtencionDTO } from './dto/tipo-atencion.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tipo-atencion')
@ApiTags('tipo-atencion')
export class TipoAtencionController {
  constructor(private readonly tipoAtencionService: TipoAtencionService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Body() dto: TipoAtencionDTO) {
    return this.tipoAtencionService.create(dto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll() {
    return this.tipoAtencionService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.tipoAtencionService.findOne(+id);
  }
  
}
