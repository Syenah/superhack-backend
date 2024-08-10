import { Module } from '@nestjs/common';
import { CcipController } from './ccip.controller';
import { CcipService } from './ccip.service';

@Module({
    controllers: [CcipController],
    providers: [CcipService],
})
export class CcipModule {}