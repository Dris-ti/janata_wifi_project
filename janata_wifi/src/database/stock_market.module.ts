import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMarket } from './stock_market.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
         StockMarket
        ])
      ],
      exports: [TypeOrmModule], 
      controllers: [],
      providers: [],
})
export class DatabaseModule {}
