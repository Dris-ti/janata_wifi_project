import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SqlModelService } from './sql-model.service';
import { StockMarket } from 'src/database/stock_market.entity';

@Controller('sql-model')
export class SqlModelController {
  constructor(private readonly sqlModelService: SqlModelService) {}

  @Post('import-csv')
  async importCsv(@Body() body: { filePath: string }) {
    await this.sqlModelService.importCsvData(body.filePath);
    return { message: 'CSV data is being imported' };
  }

  // Get all data
  @Get('/find')
  async findAll() {
    return this.sqlModelService.findAll();
  }

  // Get data by ID
  @Get('find/:id')
  async findOne(@Param('id') id) {
    return this.sqlModelService.findById(id);
  }

  // Create a new entry
  @Post('/create')
  async create(@Body() stockMarket: StockMarket) {
    return this.sqlModelService.create(stockMarket);
  }

  // Update an existing entry
  @Put('/update/:id')
  async update(@Param('id') id, @Body() stockMarket: StockMarket) {
    return this.sqlModelService.update(id, stockMarket);
  }

  // Delete an entry
  @Delete('/delete/:id')
  async delete(@Param('id') id) {
    return this.sqlModelService.delete(id);
  }
}
