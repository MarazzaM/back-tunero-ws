import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
// import { ChatGateway } from './chat.gateway';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [MessagesModule, UserModule], 
})
export class ChatModule {}
