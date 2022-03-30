import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";

export interface Connection {
  username?: string;
  client: Socket;
}

@WebSocketGateway({namespace: '/chat'})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(

  ) {}

  clients: Socket[] = [];

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket, ...args: any[]) {
    this.clients.push(client);
    this.server.emit('chatToClient', {message: `New connection, chat has ${this.clients.length} users`})
  }
  
  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter(c => c !== client);
    this.server.emit('chatToClient', {message: `User disconnected, chat has ${this.clients.length} users`})
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: any) {
    console.log('RECIVED', payload);
    this.server.emit('chatToClient', payload);
  }
}
