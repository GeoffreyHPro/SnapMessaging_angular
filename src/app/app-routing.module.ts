import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './unauthenticated_section/home/home.component';
import { ContactsComponent } from './authenticated_section/contacts/contacts.component';
import { authenticationGuard } from './guard/authentication.guard';
import { UserTemplateComponent } from './authenticated_section/user-template/user-template.component';
import { authorizationGuard } from './guard/authorization.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "user", component: UserTemplateComponent, canActivate: [authenticationGuard, authorizationGuard], children: [
      { path: "user-contacts", component: ContactsComponent }
    ]
  },

  {path: "**", redirectTo: "", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
