import { Test, TestingModule } from '@nestjs/testing';
import { CcipController } from './ccip.controller';

describe('CcipController', () => {
  let controller: CcipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CcipController],
    }).compile();

    controller = module.get<CcipController>(CcipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
