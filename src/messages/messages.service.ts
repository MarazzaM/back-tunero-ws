import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({ data: createMessageDto });
  }


  findAll() {
    return this.prisma.message.findMany();
  }
  
  findAllUser(id: string) {
    return this.prisma.message.findMany({ where: { type: id } });
  }

  findOne(id: number) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.message.delete({ where: { id } });
  }

  async findPriorityMessage() {
    // Find the oldest message with priority and order by priority then by timestamp
    const priorityMessage = await this.prisma.message.findFirst({
      where: { priority: { not: null } }, // Filter by priority not being null
      orderBy: [{ priority: 'desc' }, { timestamp: 'asc' }], // Order by priority descending and timestamp ascending
    });
  
    if (priorityMessage) {
      return priorityMessage;
    } else {
      // If no priority message is found, return a message indicating that there are no more people in the queue
      return { content: "No more people in queue" };
    }
  }
  

  async findLastMessageByType(type: string) {
    try {
      // Query the Messages table to find the last message of the specified type
      const lastMessage = await this.prisma.message.findFirst({
        where: { type },
        orderBy: { timestamp: 'desc' }, // Order by createdAt in descending order to get the last message
      });

      return lastMessage; // Return the last message
    } catch (error) {
      console.error('Error fetching last message by type:', error);
      return null; // Return null if an error occurs
    }
  }
  

  async findQueue() {
    // Find the five oldest messages with priority, ordered by priority and then by timestamp
    const priorityMessages = await this.prisma.message.findMany({
      where: { priority: { not: null } }, // Filter by priority not being null
      orderBy: [{ priority: 'desc' }, { timestamp: 'asc' }], // Order by priority descending and timestamp ascending
      take: 5, // Limit the results to 5
    });
  
    if (priorityMessages.length > 0) {
      return priorityMessages;
    } else {
      // If no priority messages are found, return a message indicating that there are no more people in the queue
      return [{ content: "No more people in queue" }];
    }
  }
}
