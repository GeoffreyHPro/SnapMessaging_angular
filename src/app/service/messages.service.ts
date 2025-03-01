import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<any> {
    const token = localStorage.getItem("Token")!
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get("http://localhost:8080/message/contact", { headers });
  }

  getConversation(idOtherUser: number): Observable<any> {
    const token = localStorage.getItem("Token")!
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get(`http://localhost:8080/message/conversation?otherUser=${idOtherUser}`, { headers });
  }

  getLastMessage(idOtherUser: number): Observable<any> {
    const token = localStorage.getItem("Token")!
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get(`http://localhost:8080/lastMessage/conversation?otherUser=${idOtherUser}`, { headers });
  }
}
