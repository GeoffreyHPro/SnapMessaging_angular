import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './unauthenticated_section/home/home.component';
import { ContactsComponent } from './authenticated_section/contacts/contacts.component';
import { authenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "user", component: ContactsComponent, canActivate: [authenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
