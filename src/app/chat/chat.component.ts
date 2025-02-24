import { Component } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private stompClient!: Client;
  isConnected = false;

  ngOnInit() {
    this.connect()
    setTimeout(() => {
      if (this.isConnected) {
        this.sendMessage();
      }
    }, 5000);
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/wsAngular/');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000
    });

    this.stompClient.onConnect = () => {
      console.log('WebSocket connected');
      this.isConnected = true;

      this.stompClient.subscribe('/topic/public', (message) => {
        console.log('Message received', message.body);
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('Error WebSocket:', error);
    };

    this.stompClient.activate();
  }

  sendMessage() {
    this.stompClient.publish({
      destination: "/app/chat.addUser",
      body: JSON.stringify({ "sender": "web", "type": "JOIN" })
    });
  }
}
