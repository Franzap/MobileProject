import { IonDatetime } from "@ionic/angular";
import { Timestamp } from "firebase/firestore";


export interface Abbonamento {
    
   // descrizione : string;
    stato : boolean;
    dataPrimoAbbonamento: Timestamp|null;
    durata: number;
    /*
    costo:number;
    durata:number;
    inizio:Date;
    */

   
   
}