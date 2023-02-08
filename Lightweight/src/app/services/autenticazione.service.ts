import { Injectable, NgZone } from '@angular/core';
import { User } from "../model/user.model";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument , DocumentData} from "@angular/fire/compat/firestore"
import { Router, NavigationExtras } from '@angular/router';
import {doc, docData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getApp } from '@firebase/app';
import {Firestore, collection, addDoc,getFirestore, deleteDoc, updateDoc} from '@firebase/firestore';
import { Abbonamento } from '../model/abbonamento.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   public userData : any;
   constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router : Router,
    public ngZone: NgZone
   
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user ) {
          this.userData = user;
          localStorage.setItem('user', 
          JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')|| '{}');
      } else {
          localStorage.setItem('user', '{}');
          JSON.parse(localStorage.getItem('user') || '{}');
      }
  })

  }

    SignIn(email:any, password:any ) {
    return this.afAuth.signInWithEmailAndPassword( email, password)
        .then((result) => {
            this.ngZone.run(() => {
                if(result.user !=null)
                {const params : NavigationExtras = {
                    queryParams: {
                        uid:result.user.uid
                    }
                };
                this.router.navigate(['/tabs/home'],params);
            }
           });
           // this.SetUserData(result.user,a);
        }).catch((error) => {
            window.alert(error.message);
        })
}

    SignUp(email:any, password:any, username:any ) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            //this.SendVerificationMail();
            this.SetUserData(result.user, username);
            this.router.navigate(['/signup-verified'],);
            }).catch((error) => {
            window.alert(error.message)
             })
      }

    SetUserData(user:any,display:any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: display,
            abbonamento:{
                descrizione: "",
                stato:false
            },
            image:"assets/user.png"
        }
        return userRef.set(userData, {
            merge: true
        })
    }
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
        })
    }

      // Send email verfificaiton when new user sign up
   /* SendVerificationMail() {
      return this.afAuth.currentUser.then((user) => {
          return user?.sendEmailVerification();
      }).then(() => {
          this.router.navigate(['verify-email-address']);
      })
  }
  // Reset Forggot password
  /*ForgotPassword(passwordResetEmail:any) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
          .then(() => {
              window.alert('Password reset email sent, check your inbox.');
          }).catch((error) => {
              window.alert(error)
          })
  }
  */

  // Returns true when user is looged in and email is verified
 /* get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return (user !== null && user.emailVerified !== false) ? true : false;
  }*/

  
  
 
//funziona ma 
addSomething(some:any , kind_of_thing:string) {
    
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const userRef = collection(db , kind_of_thing);
    return addDoc(userRef, some);
}



//funziona 
//da adattare per ogni ogetto
SetSomething(some:any) {
    const someRef: AngularFirestoreDocument<any> = this.afs.doc(`prova/${some.uid}`);
    const someData: any = {
        uid: some.uid,
       
   }
    return someRef.set(someData, {
        merge: true
    })
}

  }

  

