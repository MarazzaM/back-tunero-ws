import { Injectable } from '@nestjs/common';
import { TipoAtencionDTO } from './dto/tipo-atencion.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class TipoAtencionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: TipoAtencionDTO) {
    return this.prisma.tipoAtencion.create({ data: dto });
  }


  findAll() {
    return this.prisma.tipoAtencion.findMany();
  }

  findActive() {
    return this.prisma.tipoAtencion.findMany({ where: { active: true } });
  }
  
  
  findAllUser(id: number) {
    return this.prisma.tipoAtencion.findMany({ where: { priority: id } });
  }

  findOne(id: number) {
    return this.prisma.tipoAtencion.findUnique({ where: { id } });
  }

  async update(id: number, dto: TipoAtencionDTO) {
    return this.prisma.tipoAtencion.update({
      where: { id },
      data: dto,
    });
  }
  
  delete(id: number) {
    return this.prisma.tipoAtencion.delete({ where: { id } });
  }

}
