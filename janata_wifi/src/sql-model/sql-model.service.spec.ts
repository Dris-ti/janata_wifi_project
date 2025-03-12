import { Test, TestingModule } from '@nestjs/testing';
import { SqlModelService } from './sql-model.service';

describe('SqlModelService', () => {
  let service: SqlModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlModelService],
    }).compile();

    service = module.get<SqlModelService>(SqlModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
