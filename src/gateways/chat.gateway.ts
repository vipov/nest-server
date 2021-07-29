import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export interface Connection {
  username?: string;
  client: Socket;
}

@WebSocketGateway({namespace: '/chat'})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  connections: Connection[] = [];

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    this.connections.push({client});
    this.server.emit('chatToClient', {message: `New user connected, chat has ${this.connections.length} users`});
  }

  handleDisconnect(client: Socket) {
    this.connections = this.connections.filter(c => c.client !== client);
  }

  @SubscribeMessage('chatToServer')
  receiveChatMessage(client: Socket, chatMessage: any) {
    console.log('chatToServer', chatMessage)
    this.server.emit('chatToClient', chatMessage);
  }
}
