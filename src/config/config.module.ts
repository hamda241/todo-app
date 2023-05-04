import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AppConfigService],
  exports: [AppConfigModule, AppConfigService],
})
export class AppConfigModule implements ConfigModule {}
