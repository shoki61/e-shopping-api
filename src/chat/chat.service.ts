import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from './dto/MessageDto';

import { Message, MessageDocument } from './schemas';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async sendMessage({ senderId, recipientId, text }: MessageDto) {
    const message = await this.messageModel.create({
      sender: senderId,
      recipient: recipientId,
      text,
    });

    if (!message) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return message;
  }

  async getMessage(userId: string, recipientId: string) {
    const messages = await this.messageModel.find({
      sender: userId,
      recipient: recipientId,
    });
    if (!messages) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return messages;
  }
}
