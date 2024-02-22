import { Test, TestingModule } from '@nestjs/testing';
import { TipoAtencionService } from './tipo-atencion.service';

describe('TipoAtencionService', () => {
  let service: TipoAtencionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoAtencionService],
    }).compile();

    service = module.get<TipoAtencionService>(TipoAtencionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
