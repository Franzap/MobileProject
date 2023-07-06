import { Component, OnInit } from '@angular/core'; 
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/autenticazione.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import {Firestore, collection, addDoc,getFirestore} from '@firebase/firestore';
import { getApp } from '@firebase/app';
import { Observable } from 'rxjs';
//import {Firestore} from '@angular/fire/firestore';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

 
  public username:any; 
  public email:any;
  public password:any;
  public ionicForm: FormGroup;
  
  
  
  
 constructor(private authentication : AuthenticationService, private formBuilder: FormBuilder,
             private toastController: ToastController,) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      username : ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ]
      
    });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  onSignUp() {
    if (this.ionicForm.valid){
    this.authentication.SignUp(this.email, this.password,this.username);
    }else {
      
      this.showError();
    }
   
    
    
    
  }
   
  showError() {
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please provide all the corrected values!',
      duration: 3000,
      position: 'middle',
      color: "danger",
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel'
        }
      ],
    });
    await toast.present();
  }

    
  }

