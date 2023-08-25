import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TokenModule } from 'src/token/token.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [TokenModule, PrismaModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
