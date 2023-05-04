import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { AppConfigService } from "../../config/config.service";
import { SchemaModule } from "../../schemas/schema.module";

dotenv.config();

@Module({
  imports: [
    SchemaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, AppConfigService,JwtService],
  exports: [AuthService]
})
export class AuthModule {}
