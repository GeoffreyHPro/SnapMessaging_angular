import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  email: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  handleButtonSignIn(event: Event) {
    this.authService.signIn(this.email, this.password).subscribe(
      response => {
        console.log(response);
        if (response.status == 200) {
          localStorage.setItem("Role", response.body.role);
          localStorage.setItem("Token", response.body.token);
          this.router.navigateByUrl('user/user-contacts');
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
