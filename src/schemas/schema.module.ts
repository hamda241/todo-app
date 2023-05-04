import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserSchema } from "../apis/auth/schema/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),

  ],

  exports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
})
export class SchemaModule {}
