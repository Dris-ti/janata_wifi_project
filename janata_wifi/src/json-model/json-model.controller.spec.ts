import { Test, TestingModule } from '@nestjs/testing';
import { JsonModelController } from './json-model.controller';

describe('JsonModelController', () => {
  let controller: JsonModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JsonModelController],
    }).compile();

    controller = module.get<JsonModelController>(JsonModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
