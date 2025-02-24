import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private messagesSubject = new Subject<string>();
  public messages$: Observable<string> = this.messagesSubject.asObservable();

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.stompClient = new Client({
      brokerURL: 'ws://192.168.1.34:8080/wsAngular',
      connectHeaders: {},
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      console.log('STOMP WebSocket connecté !');
      this.stompClient.subscribe('/topic/messages', (message) => {
        this.messagesSubject.next(message.body);
      });
    };

    this.stompClient.activate();
  }

  sendMessage(message: string): void {
    const body = JSON.stringify({"sender": "web", "type":"JOIN"});
    if (this.stompClient.connected) {
      this.stompClient.publish({ destination: '/app/chat.addUser', body: body});
    }
  }
}