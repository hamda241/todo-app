import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { AppService } from "./app.service";
import { Logger } from "@nestjs/common";

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();


  //load configuration
   const configService = app.get(AppConfigService);
  await app.listen(configService.PORT);
  logger.log(
    `${configService.APP_NAME}: Listening at PORT ${configService.PORT}`,
  );
}
bootstrap();
