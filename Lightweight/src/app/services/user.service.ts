import { Injectable } from '@angular/core';
import { User } from "../model/user.model";
import { doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getApp } from '@firebase/app';
import { getFirestore, deleteDoc, updateDoc } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): Observable<User> {
    var t = JSON.parse(localStorage.getItem('user') || '{}').uid;
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, `users/${t}`)
    return docData(userRef, { idField: 'id' }) as Observable<User>;
  }

  removeUser(user: User) {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, `users/${user.uid}`);
    return deleteDoc(userRef);
  }

  updateUser(user: User) {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, `users/${user.uid}`);
    return updateDoc(userRef, {
      displayName: user.displayName, image: user.image,
      abbonamento: user.abbonamento, schede: user.schede, prenotazioni: user.prenotazioni
    });
  }

  createEmptyUser(): User {
    var empty: User = {
      uid: "",
      email: "",
      displayName: "",
      abbonamento: {
        stato: false,
        dataPrimoAbbonamento: null,
        dataScadenza: null,
        assicurazione: false,
        certificato: false
      },
      image: "",
      schede: [],
      prenotazioni: []
    }
    return empty;
  }
}
