import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoralisModule } from './moralis/moralis.module';
import { MoralisService } from './moralis/moralis.service';
import { MoralisController } from './moralis/moralis.controller';
import { ConfigModule } from '@nestjs/config';
import { SolanaController } from './solana/solana.controller';
import { SolanaService } from './solana/solana.service';
import { SolanaModule } from './solana/solana.module';
import { CcipController } from './ccip/ccip.controller';
import { CcipService } from './ccip/ccip.service';
import { CcipModule } from './ccip/ccip.module';

@Module({
  imports: [
    MoralisModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SolanaModule,
    CcipModule,
  ],
  controllers: [AppController, SolanaController,  CcipController],
  providers: [AppService, SolanaService,  CcipService],
})
export class AppModule {}