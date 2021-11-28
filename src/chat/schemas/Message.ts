import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true, type: String })
  sender: string;

  @Prop({ required: true, type: String })
  recipient: string;

  @Prop({ required: true, type: String })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
