import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async findLastMessageByType(type: string) {
    // Query the Messages table to find the last message of the specified type
    const lastMessage = await this.prisma.message.findFirst({
      where: { type },
      orderBy: { timestamp: 'desc' },
    });

    return lastMessage; // Return the last message
  }

  async findLastByType(type: string) {
    // Query the Done table to find the last ticket of the specified type
    const lastTicket = await this.prisma.done.findFirst({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });

    return lastTicket; // Return the last ticket
  }

  async generateTicket(type: string, priority: number) {
    try {
      // Fetch the last ticket from the Messages table
      const lastMessage = await this.findLastMessageByType(type);
      // Fetch the last ticket from the Done table
      const lastDoneTicket = await this.findLastByType(type);

      // Determine the ticket number
      let ticketNumber = 1; // Default to 1 if no previous ticket exists

      // Extract the numerical part of the ticket number from lastMessage and lastDoneTicket
      const lastMessageNumber = lastMessage ? parseInt(lastMessage.number.substring(1)) : 0;
      const lastDoneTicketNumber = lastDoneTicket ? parseInt(lastDoneTicket.number.substring(1)) : 0;

      // Use the highest ticket number between lastMessage and lastDoneTicket
      if (lastMessageNumber > 0 || lastDoneTicketNumber > 0) {
        const highestTicketNumber = Math.max(lastMessageNumber, lastDoneTicketNumber);
        ticketNumber = highestTicketNumber + 1; // Increment the highest ticket number by 1
      }

      // Generate the ticket number with the first letter of the type and the incremented number
      const newTicketNumber = type.charAt(0).toUpperCase() + ticketNumber.toString();

      // Create a new ticket with the specified type and ticket number
      const newTicket = await this.prisma.message.create({
        data: {
          type: type,
          number: newTicketNumber,
          priority: priority,
        },
      });

      return newTicket; // Return the newly generated ticket
    } catch (error) {
      console.error('Error generating ticket:', error);
      return null; // Return null if an error occurs
    }
  }
}
