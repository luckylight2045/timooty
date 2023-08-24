import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { createTokenDTO } from './dto/token.create.dto';
import { updateTokenDTO } from './dto/token.update.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('all')
  async getAllTokensCtrl() {
    return this.tokenService.getAllTokens();
  }

  @Post('add')
  async addTokenCtrl(@Body() data: createTokenDTO) {
    return this.tokenService.addToken(data);
  }

  @Put('update/:id')
  async updateTokenCtrl(@Body() data: updateTokenDTO, @Param('id') id) {
    return this.tokenService.updateToken(data, id);
  }

  @Delete('delete/:id')
  async deleteTokenCtrl(@Param('id') id: string) {
    return this.tokenService.deleteToken(id);
  }
}
