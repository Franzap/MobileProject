import { IonDatetime } from "@ionic/angular";
import { Timestamp } from "firebase/firestore";


export interface Abbonamento {
    
   // descrizione : string;
    stato : boolean;
    dataPrimoAbbonamento: Timestamp|null;
    dataScadenza: Timestamp|null;
    certificato:boolean;
    assicurazione:boolean;
    /*
    costo:number;
    durata:number;
    inizio:Date;
    */

   
   
}