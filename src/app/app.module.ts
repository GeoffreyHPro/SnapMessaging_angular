import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxStompService } from '@stomp/ng2-stompjs';
import { HomeComponent } from './unauthenticated_section/home/home.component';
import { FormLoginComponent } from './unauthenticated_section/home/form-login/form-login.component';
import { FormSignupComponent } from './unauthenticated_section/home/form-signup/form-signup.component';
import { ChatComponent } from './unauthenticated_section/home/chat/chat.component';
import { ContactsComponent } from './authenticated_section/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    FormLoginComponent,
    FormSignupComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    RxStompService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
