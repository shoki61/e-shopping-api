import { Body, Controller, Param, Post, Get } from '@nestjs/common';

import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('conversation/:senderId/:receiverId')
  createConversation(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return this.chatService.createConversation(senderId, receiverId);
  }

  @Get('conversation/:userId')
  getConversation(@Param('userId') userId: string) {
    return this.chatService.getConversation(userId);
  }

  @Post('message/:conversationId/:senderId')
  sendMessage(
    @Param('conversationId') conversationId: string,
    @Param('senderId') senderId: string,
    @Body('text') text: string,
  ) {
    return this.chatService.sendMessage(conversationId, senderId, text);
  }

  @Get('message/:conversationId')
  getMessages(@Param('conversationId') conversationId: string) {
    return this.chatService.getMessages(conversationId);
  }
}
