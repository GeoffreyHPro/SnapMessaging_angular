import { Component } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface InterfaceMessage {
  content: string,
  sender: string,
  type: string,
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private stompClient!: Client;
  isConnected = false;
  messages: InterfaceMessage[] = [];
  newMessage: string = '';
  username!: string;
  inputIsDisabled = "true";

  ngOnInit() {
    let number = Math.round(Math.random() * (0 - 2000) + 0);
    this.username = "username" + number;

    this.connect()
    setTimeout(() => {
      if (this.isConnected) {
        this.sendMessageJoinChatSocket();
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
        let receivedMessage = convertToInterfaceMessage(message);
        if (receivedMessage.type == "JOIN" && receivedMessage.sender == this.username) {
          this.inputIsDisabled = "false";
        }

        if (receivedMessage.type == "CHAT") {
          this.messages.push({
            content: receivedMessage.content,
            sender: receivedMessage.sender,
            type: receivedMessage.type
          });
        } else if (receivedMessage.type == "JOIN") {
          this.messages.push({
            content: receivedMessage.sender + " joined the chat",
            sender: '',
            type: receivedMessage.type
          });
        } else {
          this.messages.push({
            content: receivedMessage.sender + " left the chat",
            sender: '',
            type: receivedMessage.type
          });
        }
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('Error WebSocket:', error);
    };

    this.stompClient.activate();
  }

  sendMessageJoinChatSocket() {
    this.stompClient.publish({
      destination: "/app/chat.addUser",
      body: JSON.stringify({ "sender": this.username, "type": "JOIN", "content": "" })
    });
  }

  sendMessage() {
    this.stompClient.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify({ "sender": this.username, "type": "CHAT", "content": this.newMessage })
    });
    this.newMessage = "";
  }
}

export function convertToInterfaceMessage(message: any) {
  const parsedBody: any = JSON.parse(message.body);
  const receivedMessage: InterfaceMessage = {
    content: parsedBody.content || "Empty Message",
    sender: parsedBody.sender || "",
    type: parsedBody.type || ''
  };
  return receivedMessage;
}