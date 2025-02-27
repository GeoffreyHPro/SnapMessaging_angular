import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(email: string, password: string): Observable<any> {
    const bodyUser = { email: email, password: password }
    const headers = new HttpHeaders({
      'Content-Type': "application/json"
    })

    return this.httpClient.post("http://localhost:8080/auth/signIn", bodyUser, { headers, observe: "response" });
  }
}
