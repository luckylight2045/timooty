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
    const { title, price, description } = data;
    return await this.prisma.token.create({
      data: {
        title,
        price: parseInt(price),
        description,
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
    const existingToken = await this.findById(id);
    if (!existingToken) {
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
    const existingToken = await this.findById(id);
    if (!existingToken) {
      return new NotFoundException(`token with ${id} doesn't exist`);
    }
    return await this.prisma.token.delete({
      where: {
        id: +id,
      },
    });
  }

  async updateData() {
    const data: number[] = [];
    const tokens = await this.getAllTokens();

    tokens.forEach((item, index) => {
      data.push(item.id);
      console.log(data);
    });

    data.map(async (item) => {
      const randomNum =
        Math.floor(Math.random() * 3000) +
        Math.floor(Math.random() * 4000) +
        Math.floor(Math.random() * 500);
      console.log(randomNum);
      return await this.prisma.token.update({
        where: {
          id: item,
        },
        data: {
          price: randomNum,
        },
      });
    });
  }
}
