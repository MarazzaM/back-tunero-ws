import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('User alredy exist');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateUserAttending(userId: number, attending: string) {
    // Find the user by ID
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If user not found, throw NotFoundException
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Update the attending field
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        attending,
      },
    });
  }

}