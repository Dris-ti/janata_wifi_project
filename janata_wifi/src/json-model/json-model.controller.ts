import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import { JsonModelService } from './json-model.service';

@Controller('json-model')
export class JsonModelController {
    constructor(private readonly jsonModelService: JsonModelService) { }

    @Get("/get-stock-market-data")
    monthlyTransaction()
    {
        return this.jsonModelService.getStockMarketData();
    }
}
