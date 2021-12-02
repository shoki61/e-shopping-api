import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas';
import { Model } from 'mongoose';
import { User } from '../user/schemas';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3030, { cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @WebSocketServer()
  readonly server: Server;

  private readonly logger: Logger = new Logger(ChatGateway.name);

  onlineUsers: { userId: string; socketId: string }[] = [];

  private readonly getUserFromSocket = (userId: string) =>
    this.onlineUsers.find((user) => user.userId === userId);

  afterInit() {
    this.logger.log('Started Socket Server');
  }

  handleConnection(client: Socket) {
    this.logger.log(`User Connection ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`User Disconnect ${client.id}`);
    this.onlineUsers = this.onlineUsers.filter(
      ({ socketId }) => socketId !== client.id,
    );
    this.server.emit('onlineUsers', this.onlineUsers);
  }

  @SubscribeMessage('addUser')
  addUser(@MessageBody() userId: string, @ConnectedSocket() socket: Socket) {
    if (!this.onlineUsers.some((user) => user.userId === userId)) {
      this.onlineUsers.push({ userId, socketId: socket.id });
    }
    this.server.emit('onlineUsers', this.onlineUsers);
    console.log(this.onlineUsers);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody()
    messageDto: { senderId: string; receiverId: string; text: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { senderId, receiverId, text } = messageDto;
    console.log(senderId, receiverId);
    const user = this.getUserFromSocket(receiverId);
    this.server.to(user.socketId).emit('getMessage', { senderId, text });
    console.log(this.onlineUsers);
    console.log(user.socketId);
  }
}
