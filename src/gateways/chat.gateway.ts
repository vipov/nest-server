import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

export interface Message {
  sender: string;
  message: string;
  receiver?: string;
}

export interface User {
  username: string;
  client: Socket;
}

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() 
  wss: Server;
  private logger: Logger = new Logger('ChatGateway');

  users: User[] = [];

  messages: Message[] = [];

  constructor() {}

  handleConnection(client: Socket, ...args: any[]) {
    this.users.push({client, username: ''});
    this.messages.filter(m => !m.receiver).forEach(message => client.emit('chatToClient', message))
  }

  handleDisconnect(client: Socket) {
    let user;
    this.users = this.users.filter(u => {
      if(u.client === client) {
        user = u;
        return false;
      }
      return true;
    })
    if(user) {
      this.updateUsers(user, 'just left :(');
    }
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: Message) {
    this.messages.push(message);
    if(message.receiver) {
      const user = this.users.find(u => u.username === message.receiver);
      if(user) {
        user.client.emit('chatToClient', message);
      }
    } else {
      this.wss.emit('chatToClient', message);
    }
  }

  @SubscribeMessage('login')
  handleLogin(client: Socket, message: Message) {
    this.users.forEach(user => {
      if(user.client === client) {
        user.username = message.sender;
        this.updateUsers(user);
      }
    });
    
  }

  updateUsers(user: User, msg = 'just joined :)') {
    this.sendUsers();
    this.wss.emit('chatToClient', {sender: 'Server', message: `${user.username} ${msg} Number of users: ${this.users.length}`});
  }
  
  sendUsers() {
    this.wss.emit('users', this.users.map(u => u.username).filter(n => !!n));
  }
}
