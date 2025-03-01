import { Component } from '@angular/core';
import { MessagesService } from '../../service/messages.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  constructor(private messagesService: MessagesService) {

  }

  ngOnInit() {
    this.messagesService.getContacts().subscribe(
      response => {
        console.log(response);
      },
      error => {

      }
    )

    this.messagesService.getConversation(2).subscribe(
      response => {
        console.log(response);
      },
      error => {

      }
    )
    
  }
}
