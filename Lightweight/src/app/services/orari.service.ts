import { Injectable } from '@angular/core';
import {doc, docData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getApp } from '@firebase/app';
import {getFirestore, deleteDoc, updateDoc} from '@firebase/firestore';
import { Orari } from '../model/orari.model';

@Injectable({
  providedIn: 'root'
})
export class OrariService {

  constructor() { }

  getTimeTablesbyId(id : any) :Observable<Orari> {

    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, `orari/${id}`);
    return docData(userRef, { idField:'id'}) as  Observable<Orari>;
  }
  
}
