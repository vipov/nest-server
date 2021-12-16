import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

interface Connection {
  username?: string;
  client: Socket;
}

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  connections: Connection[] = [];

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    this.connections.push({ client });
    this.server.emit('chatToClient', {
      message: `New user connecting... users on chat: ${this.connections.length}`,
    });
  }

  handleDisconnect(client: Socket) {
    this.connections = this.connections.filter((c) => c.client !== client);
    this.server.emit('chatToClient', {
      message: `User is disconnected... users on chat: ${this.connections.length}`,
    });
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: any) {
    console.log('RECIVED chatToServer', payload);
    this.server.emit('chatToClient', payload);
  }
}
