import { Injectable, NgZone } from '@angular/core';
import { User } from "../model/user.model";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from "@angular/fire/compat/firestore"
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        private toastController: ToastController,
    ) { }

    //Login dell'Utente con Email e Password
    //se l'utente risulta registrato entra nell'app e memorizza nel localStorage le info dell'utente  
    async SignIn(email: any, password: any) {
        await this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    if (result.user != null) {
                        localStorage.clear();
                        localStorage.setItem('user', JSON.stringify(result.user));
                        this.router.navigate(['/tabs/home']);
                    }
                })
            }).catch((error) => {
                //window.alert(error.message);
                this.showError();
            })
    }
    //registrazione e creazione dell'utente nel DB
    async SignUp(email: any, password: any, username: any) {
        await this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {

                this.SetUserData(result.user, username);

                this.router.navigate(['/signup-verified']);
            }).catch((error) => {
                window.alert(error.message)
            })
    }
    //logout
    //vengono rimosse dal localStorage le informazioni dell'Utente e uscita dall'app
    async SignOut() {
        await this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
        })
    }
    //viene inserito l'utente nel DB con le informazioni inserite nella fase di registrazione
    SetUserData(user: any, display: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: display,
            abbonamento: {
                stato: false,
                dataPrimoAbbonamento: null,
                dataScadenza: null,
                assicurazione: false,
                certificato: false
            },
            image: "assets/user.png",
            schede: [],
            prenotazioni: []
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    showError() {
        this.presentToast();
      }
      async presentToast() {
        const toast = await this.toastController.create({
          message: 'Credenziali errate',
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



