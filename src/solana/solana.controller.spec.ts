import { Test, TestingModule } from '@nestjs/testing';
import { SolanaController } from './solana.controller';

describe('SolanaController', () => {
  let controller: SolanaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolanaController],
    }).compile();

    controller = module.get<SolanaController>(SolanaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
