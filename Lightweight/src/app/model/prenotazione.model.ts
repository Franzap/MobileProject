import { Timestamp } from "firebase/firestore";

export interface Prenotazione {
    uid: string ;
    date:Timestamp[];
}