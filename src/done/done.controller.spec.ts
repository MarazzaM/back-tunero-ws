import { Test, TestingModule } from '@nestjs/testing';
import { DoneController } from './done.controller';

describe('DoneController', () => {
  let controller: DoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoneController],
    }).compile();

    controller = module.get<DoneController>(DoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
