import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ChatGateway } from './chat/chat.gateway';
import { MessagesModule } from './messages/messages.module';
import { DoneModule } from './done/done.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MessagesModule,
    DoneModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ChatGateway],
})
export class AppModule {}