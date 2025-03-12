// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { JsonModelModule } from './json-model/json-model.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { StockMarket } from './database/stock_market.entity';
// import { SqlModelModule } from './sql-model/sql-model.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'root',
//       database: 'stock_market',
//       entities: [StockMarket],
//       synchronize: true,
//     }),
//     SqlModelModule,
//     JsonModelModule
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlModelModule } from './sql-model/sql-model.module';
import { JsonModelModule } from './json-model/json-model.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads environment variables

    // MongoDB Configuration
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb+srv://usrdristi:0KCJlBPIOvAKRBoC@cluster0.hs2ul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      bufferCommands: false, // Prevent buffering before connection
      serverSelectionTimeoutMS: 50000, // Increase timeout
    }),

    SqlModelModule,
    JsonModelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

