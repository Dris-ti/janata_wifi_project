import { Test, TestingModule } from '@nestjs/testing';
import { SqlModelController } from './sql-model.controller';

describe('SqlModelController', () => {
  let controller: SqlModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqlModelController],
    }).compile();

    controller = module.get<SqlModelController>(SqlModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
