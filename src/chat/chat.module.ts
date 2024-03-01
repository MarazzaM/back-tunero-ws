import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { DoneModule } from 'src/done/done.module';
// import { ChatGateway } from './chat.gateway';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ChatService } from './chat.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [MessagesModule, DoneModule, UserModule, PrismaModule],
  providers: [ChatService], 
  exports: [ChatService], 

})
export class ChatModule {}
