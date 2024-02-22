import { Test, TestingModule } from '@nestjs/testing';
import { TipoAtencionController } from './tipo-atencion.controller';
import { TipoAtencionService } from './tipo-atencion.service';

describe('TipoAtencionController', () => {
  let controller: TipoAtencionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoAtencionController],
      providers: [TipoAtencionService],
    }).compile();

    controller = module.get<TipoAtencionController>(TipoAtencionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
