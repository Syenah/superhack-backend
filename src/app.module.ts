import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CcipModule } from './ccip/ccip.module';
import { CcipController } from './ccip/ccip.controller';
import { CcipService } from './ccip/ccip.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CcipModule
  ],
  controllers: [AppController,CcipController],
  providers: [AppService,CcipService],
})
export class AppModule {}