import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { createTokenDTO } from './dto/token.create.dto';
import { updateTokenDTO } from './dto/token.update.dto';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTokens() {
    return await this.prisma.token.findMany({});
  }

  async addToken(data: createTokenDTO) {
    const { title, price } = data;
    return await this.prisma.token.create({
      data: {
        title,
        price: parseInt(price),
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.token.findUnique({
      where: {
        id: +id,
      },
    });
  }

  async updateToken(data: updateTokenDTO, id: string) {
    if (!this.findById(id)) {
      return new NotFoundException(`token with ${id} doesn't exist`);
    }
    return await this.prisma.token.update({
      where: {
        id: +id,
      },
      data: {
        price: +data.price,
      },
    });
  }

  async deleteToken(id: string) {
    if (!this.findById(id)) {
      return new NotFoundException(`token with ${id} doesn't exist`);
    }
    return await this.prisma.token.delete({
      where: {
        id: +id,
      },
    });
  }
}
