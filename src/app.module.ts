import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from "./config/config.module";
import { AppConfigService } from "./config/config.service";
import {ConfigModule} from '@nestjs/config';
import {validate} from './env.validate';
import { AuthModule } from "./apis/auth/auth.module";

@Module({
  imports: [
   // MongooseModule.forRoot('mongodb+srv://hamda:hamdanaeem@todoapp.iudakh0.mongodb.net/?retryWrites=true&w=majority')
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        uri: config.MONGO_URI,
      }),
    }),
    ConfigModule.forRoot({
      validate,
      expandVariables: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
