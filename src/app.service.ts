import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { TokenService } from './token/token.service';
import { TransactionService } from './transaction/transaction.service';

@Injectable()
export class AppService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly transactionService: TransactionService,
  ) {}

  getHello() {
    return 'Hello World';
  }

  @Interval(2000)
  handleInterval() {
    return this.tokenService.updateData();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const tokens = await this.tokenService.getAllTokens();

    const randomNum =
      Math.floor(Math.random() * tokens.length) < 9
        ? Math.floor(Math.random() * tokens.length)
        : Math.floor(Math.random() * tokens.length) - 1;

    const id = tokens[randomNum].id.toString();

    return this.transactionService.makeTransaction(id);
  }
}
