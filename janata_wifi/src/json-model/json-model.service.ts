import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class JsonModelService {
    async getStockMarketData() {
        try {
            const filePath = 'src/json-model/stock_market_data.json'; 
            const fileContent = readFileSync(filePath, 'utf8');
            return JSON.parse(fileContent);
          } catch (error) {
            throw new Error('Error reading stock market data: ' + error.message);
          }
    }
}
