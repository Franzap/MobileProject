import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticazione.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: any;
  public password: any;
  constructor(public authentication: AuthenticationService,
    private router: Router) { }
//se l'Utente è già registrato entra direttamente nell'Home Page
  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      this.router.navigate(['/tabs/home']);
    }
  }
  
  async Login() {
    await this.authentication.SignIn(this.email, this.password);
  } 

  SignUp() {
    this.router.navigate(['/signup']);
  }
}





