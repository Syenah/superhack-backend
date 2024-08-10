import { Test, TestingModule } from '@nestjs/testing';
import { MoralisService } from './moralis.service';

describe('MoralisService', () => {
  let service: MoralisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoralisService],
    }).compile();

    service = module.get<MoralisService>(MoralisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
