import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private socket = io("http://localhost:8080");
  constructor() { }


  joinRequestChat(data) {
    this.socket.emit('join', data);
  }

  newUserJoined(){
    let observable = new Observable < { userName: String, message: String }>(observer =>{
      this.socket.on('userHasJoined', (data) => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
    return observable;
  }

}
