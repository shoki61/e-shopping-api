import { Body, Controller, Param, Post, Get } from '@nestjs/common';

import { ChatService } from './chat.service';
import { MessageDto } from './dto/MessageDto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('send')
  sendMessage(
    @Param('senderId') senderId: string,
    @Param('recipientId') recipientId: string,
    @Body() text: string,
  ) {
    return this.chatService.sendMessage({ senderId, recipientId, text });
  }

  @Get('get_messages')
  getMessages(
    @Param('userId') userId: string,
    @Param('recipientId') recipientId: string,
  ) {
    return this.chatService.getMessage(userId, recipientId);
  }
}
