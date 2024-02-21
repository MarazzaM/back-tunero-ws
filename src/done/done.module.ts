import { Module } from '@nestjs/common';
import { DoneService } from './done.service';
import { DoneController } from './done.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma.module';
@Module({
  controllers: [DoneController],
  providers: [DoneService, JwtService],
  imports: [PrismaModule],
  exports: [DoneService], 
})
export class DoneModule {}