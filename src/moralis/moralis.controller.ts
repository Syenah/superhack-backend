import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { MoralisService } from './moralis.service';

@Controller('moralis')
export class MoralisController {
  constructor(private readonly moralisService: MoralisService) {}

  @Get('ethereumTokenBalances')
  async getWalletTokenBalances(
    @Query('chain') chain: string,
    @Query('address') address: string,
  ) {
    try {
      const tokenBalances = await this.moralisService.getWalletTokenBalancesPrice(
        chain,
        address,
      );
      return tokenBalances;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('walletTokenBalancesPriceAptos')
  async getSPL(
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('address') ownerAddress: string,
    @Query('network') network: string,
  ) {
    try {
      const ownerAddresses: string[] = [ownerAddress];
      const tokenBalances = await this.moralisService.getSPL(
        
    
        limit,
        ownerAddresses,
        network,
        
      );
      return tokenBalances;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
