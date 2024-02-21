import { Test, TestingModule } from '@nestjs/testing';
import { DoneService } from './done.service';

describe('DoneService', () => {
  let service: DoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoneService],
    }).compile();

    service = module.get<DoneService>(DoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
