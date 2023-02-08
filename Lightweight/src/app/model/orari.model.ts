import { Timestamp } from "firebase/firestore";

export interface Orari {
    
    apertura: Timestamp;
    chiusura: Timestamp;
}