import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  users: any[] = [];

  handleDisconnect(client: any) {
    this.users = this.users.filter(c => c !== client)
    
    this.wss.emit('chatToClient', {sender: 'Server', message: `Number of users: ${this.users.length}`});
  }

  handleConnection(client: any, ...args: any[]) {
    this.users.push(client);
    this.wss.emit('chatToClient', {sender: 'Server', message: `Number of users: ${this.users.length}`});
  }

  @WebSocketServer() 
  wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }
  

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, message: string }) {
    this.wss.emit('chatToClient', message);
  }

}
