import { Test, TestingModule } from '@nestjs/testing';
import { JsonModelService } from './json-model.service';

describe('JsonModelService', () => {
  let service: JsonModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonModelService],
    }).compile();

    service = module.get<JsonModelService>(JsonModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
