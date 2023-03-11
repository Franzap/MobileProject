import { IonDatetime } from "@ionic/angular";
import { Timestamp } from "firebase/firestore";


export interface Abbonamento {
    stato: boolean;
    dataPrimoAbbonamento: Timestamp | null;
    dataScadenza: Timestamp | null;
    certificato: boolean;
    assicurazione: boolean;
}