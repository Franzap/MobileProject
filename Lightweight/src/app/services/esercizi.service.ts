import { Injectable } from '@angular/core';
import { Esercizio } from '../model/esercizio.model';
import { collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getApp } from '@firebase/app';
import { getFirestore, deleteDoc, updateDoc, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EserciziService {

  constructor() { }

  getAllExercises(): Observable<Esercizio[]> {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const exercisesRef = collection(db, `esercizi/`)
    return collectionData(exercisesRef, { idField: 'id' }) as Observable<Esercizio[]>;
  }
}

