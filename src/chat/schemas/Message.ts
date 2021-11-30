import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  conversationId: Types.ObjectId;

  @Prop({ ref: 'user' })
  sender: Types.ObjectId;

  @Prop({ required: true, type: String })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
