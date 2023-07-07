import { Timestamp, collection } from "firebase/firestore";
import { User } from "../model/user.model";
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from "@angular/fire/compat/firestore"

import { Prenotazione } from "../model/prenotazione.model";



@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  
  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth,) { }

  public updatePrenotazione(user : User ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`prenotazioni/${user.uid}`);
        const userData: Prenotazione = {
            uid: user.uid,
            date : user.prenotazioni,
           
        }
        return userRef.set(userData, {
            merge: true
        })
  }

 public getAllPrenotazioni(date : Timestamp) : Observable<Prenotazione[]> {
  //window.alert(date);
  
  const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const exercisesRef = collection(db, `prenotazioni/`);
    return  collectionData(exercisesRef) as Observable<Prenotazione[]>  ;
   
    
 }
}
