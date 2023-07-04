import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticazione.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: any;
  public password: any;
  public ionicForm: FormGroup;
  constructor(private authentication: AuthenticationService,
    private router: Router) { }
//se l'Utente è già registrato entra direttamente nell'Home Page
  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      //window.location.reload();
      this.router.navigate(['/tabs/home']);
    }
   
  }
  
  Login() {
   
     this.authentication.SignIn(this.email, this.password);
   
  } 

  SignUp() {
    this.router.navigate(['/signup']);
  }
}





