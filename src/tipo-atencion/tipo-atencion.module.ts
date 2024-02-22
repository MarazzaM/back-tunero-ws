import { Module } from '@nestjs/common';
import { TipoAtencionService } from './tipo-atencion.service';
import { TipoAtencionController } from './tipo-atencion.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [TipoAtencionController],
  providers: [TipoAtencionService, JwtService],
  imports: [PrismaModule],
  exports: [TipoAtencionService], 
})
export class TipoAtencionModule {}