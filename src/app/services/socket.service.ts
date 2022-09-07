import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  constructor() {}

  //setup
  initSocket() {
    this.socket = io(SERVER_URL);
    return () => {
      this.socket.disconnect();
    };
  }

  //emit msg
  send(message: string) {
    this.socket.emit('message', message);
  }

  getMessage() {
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }
}
