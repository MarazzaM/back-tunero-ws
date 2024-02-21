import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from 'src/prisma.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [MessagesController],
  providers: [MessagesService, JwtService],
  imports: [PrismaModule],
  exports: [MessagesService], 
})
export class MessagesModule {}
