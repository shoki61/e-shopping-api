import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationDocument,
  Message,
  MessageDocument,
} from './schemas';
import { User, UserDocument } from 'src/user/schemas';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createConversation(senderId: string, receiverId: string) {
    const existingConversation = await this.conversationModel.findOne({
      members: [senderId, receiverId],
    });
    if (existingConversation) {
      return existingConversation;
    }
    const conversation = await this.conversationModel.create({
      members: [senderId, receiverId],
    });
    if (!conversation) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return conversation;
  }

  async getConversation(userId: string) {
    const conversations = await this.conversationModel.find({
      members: { $in: [userId] },
    });
    return conversations;
  }

  async sendMessage(conversationId: string, senderId: string, text: string) {
    const newMessage = await this.messageModel.create({
      conversationId: new Types.ObjectId(conversationId),
      sender: senderId,
      text,
    });
    if (!newMessage) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return newMessage;
  }

  async getMessages(conversationId: string) {
    const messages = await this.messageModel.find({
      conversationId: new Types.ObjectId(conversationId),
    });
    return messages;
  }
}
