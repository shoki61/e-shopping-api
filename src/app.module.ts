import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    UserModule,
    ChatModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
