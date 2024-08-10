import { Controller, Post, Body } from '@nestjs/common';
import { CcipService } from './ccip.service';

@Controller('ccip')
export class CcipController {
  constructor(private readonly ccipService: CcipService) {}

  @Post('transfer-native')
  async transferTokensPayNative(@Body() transferData: {
    destinationChainSelector: string;
    receiver: string;
    token: string;
    amount: string;
  }) {
    return this.ccipService.transferTokensPayNative(
      transferData.destinationChainSelector,
      transferData.receiver,
      transferData.token,
      transferData.amount
    );
  }
}