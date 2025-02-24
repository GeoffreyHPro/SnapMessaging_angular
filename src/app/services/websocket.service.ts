// import { Injectable } from '@angular/core';
// import { Stomp } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { Subject } from 'rxjs';
// import './../../../polyfills';
// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {

//   private stompClient: any;
//   private url: string = 'http://localhost:8080/ws'; // URL de votre backend Spring Boot (vérifiez le chemin)
//   private messagesSubject: Subject<any> = new Subject<any>();

//   constructor() { }

//   // Connexion à WebSocket via SockJS et Stomp
//   connect() {
//     const socket = new SockJS(this.url);
//     this.stompClient = Stomp.over(socket);

//     // Se connecter au serveur STOMP
//     this.stompClient.connect({}, (frame: string) => {
//       console.log('Connecté à WebSocket', frame);

//       // S'abonner à un canal de votre choix (ex. /topic/messages)
//       this.stompClient.subscribe('/topic/messages', (message: any) => {
//         if (message.body) {
//           this.messagesSubject.next(JSON.parse(message.body));
//         }
//       });
//     }, (error: string) => {
//       console.error('Erreur de connexion WebSocket :', error);
//     });
//   }

//   // Envoi de message via STOMP
//   sendMessage(destination: string, message: any) {
//     if (this.stompClient && this.stompClient.connected) {
//       this.stompClient.send(destination, {}, JSON.stringify(message));
//     } else {
//       console.error('STOMP client non connecté');
//     }
//   }

//   // Obtenir les messages reçus
//   getMessages() {
//     return this.messagesSubject.asObservable();
//   }

//   // Déconnexion du WebSocket
//   disconnect() {
//     if (this.stompClient) {
//       this.stompClient.disconnect(() => {
//         console.log('Déconnecté du serveur WebSocket');
//       });
//     }
//   }
// }