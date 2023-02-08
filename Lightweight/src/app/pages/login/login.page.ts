import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticazione.service';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email:any;
  public password:any;
  constructor(public authentication : AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  Login() {
    this.authentication.SignIn(this.email, this.password);
  }
    
  SignUp() {
  this.router.navigate(['/signup']);
  }

}

  
  
  
  
