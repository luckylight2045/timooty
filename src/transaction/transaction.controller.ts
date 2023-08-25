import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('make/:id')
  async makeTransactionCtrl(@Param('id') id: string) {
    return await this.transactionService.makeTransaction(id);
  }

  @Get('all')
  async getAllTransactionsCtrl() {
    return await this.transactionService.getAllTransactions();
  }

  @Delete('delete/:id')
  async deleteTransactionCtrl(@Param('id') id: string) {
    return await this.transactionService.deleteTransaction(id);
  }
}
