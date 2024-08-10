import { Test, TestingModule } from '@nestjs/testing';
import { CcipService } from './ccip.service';

describe('CcipService', () => {
  let service: CcipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CcipService],
    }).compile();

    service = module.get<CcipService>(CcipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
