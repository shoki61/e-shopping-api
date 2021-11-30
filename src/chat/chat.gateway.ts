import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
// import { ChatService } from './chat.service';
import { Bind, Logger, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas';
import { Model } from 'mongoose';
import { User } from '../user/schemas';
import { Socket } from 'socket.io';

// @WebSocketGateway()
// export class ChatGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   constructor(
//     @InjectModel(Message.name) private messageModel: Model<Message>,
//     @InjectModel(User.name) private userModel: Model<User>,
//   ) {}

//   // @WebSocketServer()
//   // readonly server: Server;

//   private readonly logger: Logger = new Logger(ChatGateway.name);

//   async handleDisconnect(client: Socket) {
//     const user = await this.userModel.findOne({ _id: client.id });
//     if (user) {
//       this.logger.log(`Disconnect the ${client.id}`);
//     }
//   }

//   // @SubscribeMessage('add-message')
//   // async addMessage(client: Socket, message: Message) {
//   //   message = await this.messageModel.create(message);
//   //   // this.server.to(message.recipient).emit('new_message', message);
//   // }

//   // @SubscribeMessage('events')
//   // handleEvent(client: any, data: string): string {
//   //   return data;
//   // }

//   // afterInit(server: any) {
//   //   console.log('Init');
//   // }

//   // handleConnection(socket: any) {
//   //   const query = socket.handshake.query;
//   //   console.log('Connect', query);
//   //   // this.chatService.userConnected(query.userName, query.registrationToken);
//   //   // process.nextTick(async () => {
//   //   //   socket.emit('allChats', await this.chatService.getChats());
//   //   // });
//   // }

//   // @Bind(MessageBody(), ConnectedSocket())
//   // @SubscribeMessage('chat')
//   // async handleNewMessage(chat: any, sender: any) {
//   //   console.log('New Chat', chat);
//   //   // await this.chatService.saveChat(chat);
//   //   sender.emit('newChat', chat);
//   //   sender.broadcast.emit('newChat', chat);
//   //   // await this.chatService.sendMessagesToOfflineUsers(chat);
//   // }
// }
