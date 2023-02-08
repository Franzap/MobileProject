import { Component, OnInit } from '@angular/core'; 
import { AuthenticationService } from 'src/app/services/autenticazione.service';
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
  
  
  
  
 constructor(public authentication : AuthenticationService) { }

  ngOnInit() {
  }

  onSignUp() {
    this.authentication.SignUp(this.email, this.password,this.username);
    //this.fireService.SignIn(this.email,this.password);
    //this.addUser();
    
    
   
    //this.firestore.collection<any>('users');
   // this.addUser();
    //this.add();
    
    
    
    
  }
    /*submit(){
      window.alert(this.username);
      window.alert(this.email);
      window.alert(this.password);
    }
    */
   /*addUser() {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const send = collection(db , "users");
    const data = {
      username : this.username,
      id : "ciao"
    
    }
    return addDoc(send,data);
   }
   */
   
   

   /*add() {
    const notesRef = collection(this.Firestore ,'users');
    const data = {
      username : this.username
    }
     return addDoc(notesRef ,data );
   }
   */
   /*addItem(name: string) { 
    const user = 'users'; 
    this.Firestore.add({ name, user }); 
  } 
  */


    
  }

