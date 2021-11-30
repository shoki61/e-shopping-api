import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import {
  Conversation,
  ConversationSchema,
  Message,
  MessageSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
