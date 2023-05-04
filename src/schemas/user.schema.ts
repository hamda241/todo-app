import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  userId: string;
  @Prop()
  email: string;
}
