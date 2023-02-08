import { Injectable } from '@angular/core';
import { User } from "../model/user.model";
import {doc, docData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getApp } from '@firebase/app';
import {getFirestore, deleteDoc, updateDoc} from '@firebase/firestore';
import { Abbonamento } from '../model/abbonamento.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserbyId(id : any) :Observable<User> {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, `users/${id}`)
    return docData(userRef, { idField:'id'}) as Observable<User>;
  }

  removeUser(user:User) {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const userRef =doc(db, `users/${user.uid}`);
    return deleteDoc(userRef);
}


  updateUser(user:User) {
  const firebaseApp = getApp();
  const db = getFirestore(firebaseApp);
  const userRef =doc(db, `users/${user.uid}`);
  return updateDoc(userRef, { displayName:user.displayName , image:user.image,
   abbonamento:user.abbonamento, });
}
updateUserabb(user:User, abb:Abbonamento) {
  const firebaseApp = getApp();
  const db = getFirestore(firebaseApp);
  const userRef =doc(db, `users/${user.uid}`);
  return updateDoc(userRef, {abbonamento : abb});
}

}
