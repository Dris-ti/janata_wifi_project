import { Module } from '@nestjs/common';
import { SqlModelService } from './sql-model.service';
import { SqlModelController } from './sql-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMarket } from 'src/database/stock_market.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([StockMarket])
  ],
    providers: [SqlModelService],
    controllers: [SqlModelController]
})
export class SqlModelModule {}
