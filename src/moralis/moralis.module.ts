import { Module} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MoralisController } from './moralis.controller';
import { MoralisService } from './moralis.service';


@Module({
  imports: [HttpModule],
  controllers: [MoralisController],
  providers: [MoralisService]
})
export class MoralisModule {}
