import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class  AppConfigService extends ConfigService {
  constructor() {
    super();
  }

  get APP_NAME(): string {
    return this.get('APP_NAME');
  }
  get PORT(): number {
    return +this.get('PORT');
  }
  get NODE_ENV(): string {
    return this.get('NODE_ENV');
  }
  get MONGO_URI(): string {
    return this.get('MONGO_URI');
  }
  get all(): any {
    return {
      APP_NAME: this.get('APP_NAME'),
      PORT: +this.get('PORT'),
      NODE_ENV: this.get('NODE_ENV'),
      MONGO_URI: this.get('MONGO_URI'),
    };
  }
}
