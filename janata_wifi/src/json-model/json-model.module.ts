import { Module } from '@nestjs/common';
import { JsonModelService } from './json-model.service';
import { JsonModelController } from './json-model.controller';

@Module({
  imports: [],
  providers: [JsonModelService],
  controllers: [JsonModelController]
})
export class JsonModelModule {}
