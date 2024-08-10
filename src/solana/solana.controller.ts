import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { SolanaService } from './solana.service';

@Controller('solana')
export class SolanaController {
  constructor(private readonly tokenService: SolanaService) {}

  @Get("getSolanaTokenBalance")
  async getTokens(@Query('address') address: string, @Query('network') network: string) {
    try {
      return await this.tokenService.getTokensHeldByAddress(address, network);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
