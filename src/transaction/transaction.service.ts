import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async makeTransaction(id: string) {
    const token = await this.tokenService.findById(id);

    if (!token) {
      return new BadRequestException(`token with ${id} doesn't exist`);
    }

    return await this.prisma.transaction.create({
      data: {
        tokenId: token.id,
      },
    });
  }

  async getAllTransactions() {
    return await this.prisma.transaction.findMany({
      select: {
        tokenId: true,
        token: {
          select: {
            title: true,
            price: true,
          },
        },
      },
    });
  }

  async deleteTransaction(id: string) {
    const token = await this.tokenService.findById(id);

    if (!token) {
      return new NotFoundException();
    }

    return await this.prisma.transaction.delete({
      where: {
        id: +id,
      },
    });
  }
}
