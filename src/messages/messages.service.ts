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
    // Find the message with the smallest ID and type equal to "priority"
    const priorityMessage = await this.prisma.message.findFirst({
      where: { type: 'priority' },
      orderBy: { id: 'asc' },
    });
  
    if (priorityMessage) {
      return priorityMessage;
    } else {
      // If no priority message is found, find the message with the smallest ID and type equal to "normal"
      const normalMessage = await this.prisma.message.findFirst({
        where: { type: 'normal' },
        orderBy: { id: 'asc' },
      });
  
      if (normalMessage) {
        return normalMessage;
      } else {
        // If no normal message is found either, return a message indicating that there are no more people in the queue
        return { content: "No more people in queue" };
      }
    }
  }
  
}
