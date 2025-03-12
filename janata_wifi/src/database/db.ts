import mongoose, { Schema, Document } from "mongoose";

export interface StockMarket extends Document {
  date?: Date;
  trade_code: string;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
}

const StockMarketSchema: Schema<StockMarket> = new Schema(
  {
    date: { type: Date, required: false }, 
    trade_code: { type: String, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    volume: { type: Number, required: true },
  }
);

export const StockMarketModel =
  (mongoose.models.StockMarket as mongoose.Model<StockMarket>) ||
  mongoose.model<StockMarket>("StockMarket", StockMarketSchema);
