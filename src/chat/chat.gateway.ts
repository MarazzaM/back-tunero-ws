import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { UserService } from 'src/user/user.service';
import { DoneService } from 'src/done/done.service';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly doneService: DoneService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
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
  async handleLlamarTurno(
    client: any,
    { callerId, position }: { callerId: any; position: string }
  ): Promise<void> {
    console.log('Llamando turno:', callerId);
  
    const savedMessage = await this.messagesService.findPriorityMessage();
    console.log(savedMessage);
    const attending = JSON.stringify(savedMessage);
  
    const appointmentInfo = {
      callerId,
      appointment: savedMessage,
      position: position, // Ensure position is correctly assigned here
    };
  
    if ('id' in savedMessage) {
      console.log(callerId);
      const userId = parseInt(callerId);
      console.log(userId);
      await this.userService.updateUserAttending(userId, attending);
      await this.messagesService.delete(savedMessage.id);
    }
  
    this.server.emit('calledAppointment', appointmentInfo);
    client.emit('calledAppointment', appointmentInfo); // Emit appointmentInfo instead of savedMessage
  }
  

  @SubscribeMessage('generateTicket')
  async handleGenerateTicket(client: any, payload) {
    try {
      const { type } = payload;
      const { priority } = payload;

      // Fetch the last message of the specified type from the Messages table
      const lastMessage = await this.chatService.findLastMessageByType(type);

      // If a message of the specified type exists, increment its ticket number by 1 and save it
      if (lastMessage) {
        const newTicket = await this.chatService.generateTicket(type, priority); // Generate a new ticket
        return newTicket;
      }

      // Fetch the last ticket of the specified type from the Done table
      const lastTicket = await this.chatService.findLastByType(type);

      // If a ticket of the specified type exists, use its information
      if (lastTicket) {
        return lastTicket;
      }

      // If no message or ticket of the specified type exists, generate a new ticket
      const newTicket = await this.chatService.generateTicket(type, priority);

      // Return the generated ticket information
      client.emit('generatedTicket', newTicket);
      return newTicket;
    } catch (error) {
      console.error('Error handling generateTicket:', error);
      return null; // Return null if an error occurs
    }
  }
}
