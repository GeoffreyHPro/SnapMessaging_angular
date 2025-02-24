import { Component } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: string[] = [];
  messageInput: string = '';

  constructor(private wsService: WebSocketService) {
    this.wsService.messages$.subscribe(msg => this.messages.push(msg));
  }

  sendMessage(): void {
    if (this.messageInput.trim()) {
      this.wsService.sendMessage(this.messageInput);
      this.messageInput = '';
    }
  }
}