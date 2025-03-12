import { Body, Injectable, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockMarket } from 'src/database/stock_market.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import dbConnect from 'src/database/dbConnect';
import { StockMarketModel } from 'src/database/db';
import mongoose from 'mongoose';

@Injectable()
export class SqlModelService {
  constructor(
    // @InjectRepository(StockMarket)
    // private readonly stockMarketRepository: Repository<StockMarket>,
  ) {}

  async importCsvData(filePath: string) {
    await dbConnect();
    const results: any[] = [];

    // Read the CSV file and parse it
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        console.log('CSV row:', row); 
        // Trim keys to remove any extra spaces
        const cleanedRow = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.trim(), value])
        );
        results.push(cleanedRow);
      })
      .on('end', async () => {
        // Process the data after it's read
        const stockMarketData = results.map((item) => {
          console.log('Processed CSV data:', item);

          const stockMarket = new StockMarket();
          stockMarket.id = item.id;
          stockMarket.date = item.date;
          stockMarket.trade_code = item.trade_code;
          stockMarket.high = parseFloat(item.high);  
          stockMarket.low = parseFloat(item.low);  
          stockMarket.open = parseFloat(item.open);  
          stockMarket.close = parseFloat(item.close);
          stockMarket.volume = parseInt(item.volume.replace(/,/g, ''), 10); // Remove commas from volume and convert to number

          return stockMarket;
        });

        // await this.stockMarketRepository.save(stockMarketData);
        await StockMarketModel.insertMany(stockMarketData);
        console.log('CSV data successfully imported into database.');
      });      
  }

  // Fetch all 
  
  async findAll(){
    await dbConnect();
    return await StockMarketModel.find();
    // return await this.stockMarketRepository.find();
  }

  // Fetch by ID
  async findById(id) {
    await dbConnect();
    const record = await StockMarketModel.findById(new mongoose.Types.ObjectId(id));
  
    if (!record) {
      console.log("No record found for ID:", id);
    }
    
    return record;
  }

  async create(stockMarket: StockMarket) {
    await dbConnect();
    return await StockMarketModel.create(stockMarket);
  }

  async update(id, stockMarket: StockMarket){
    await dbConnect();
    return await StockMarketModel.findByIdAndUpdate
    (id, stockMarket, { new: true });
  }

  async delete(id) {
    await dbConnect();
    return await StockMarketModel.findByIdAndDelete(id);
  }
}
