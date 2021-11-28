import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  senderId: string;

  @IsString()
  recipientId: string;

  @IsString()
  text: string;
}
