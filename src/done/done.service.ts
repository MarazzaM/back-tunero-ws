import { Injectable } from '@nestjs/common';
import { DoneDTO } from './dto/done.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class DoneService {
  constructor(private prisma: PrismaService) {}

  create(doneDTO: DoneDTO) {
    return this.prisma.done.create({ data: doneDTO });
  }


  findAll() {
    return this.prisma.done.findMany();
  }
  
  findAllUser(id: string) {
    return this.prisma.done.findMany({ where: { caller: id } });
  }

  findOne(id: number) {
    return this.prisma.done.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.done.delete({ where: { id } });
  }

}
