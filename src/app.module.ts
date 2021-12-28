import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB, {
      useNewUrlParser: true,
    }),
    UserModule,
    ChatModule,
    ProductModule,
  ],
  providers: [],
})
export class AppModule {}
