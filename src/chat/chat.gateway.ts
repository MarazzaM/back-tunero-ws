import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly userService: UserService, 
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: CreateMessageDto): Promise<void> {
    console.log('Received message:', payload);

    // Save the message to the database using Prisma
    const savedMessage = await this.messagesService.create(payload);

    console.log('Saved message to database:', savedMessage);

    // Broadcast the saved message to all connected clients
    this.server.emit('message', savedMessage);
  }
  @SubscribeMessage('callAppointment')
  async handleLlamarTurno(client: any, callerId): Promise<void> {
    console.log('Llamando turno:', callerId);
  
    const savedMessage = await this.messagesService.findPriorityMessage();
    const attending = JSON.stringify(savedMessage);
  
    const appointmentInfo = { callerId, appointment: savedMessage };
    if ('id' in savedMessage) {
      console.log(callerId)
      const userId = parseInt(callerId.callerId);
      console.log(userId)
      await this.userService.updateUserAttending(userId, attending); // Ensure userId is passed correctly
      await this.messagesService.delete(savedMessage.id);
    }
  
    this.server.emit('calledAppointment', appointmentInfo);
    client.emit('calledAppointment', savedMessage);
  }
  
}
