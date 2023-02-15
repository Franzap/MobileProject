import { Abbonamento } from "./abbonamento.model";
import { Scheda } from "./scheda.model";

export interface User {
    uid: string ;
    email: string;
    displayName: string;
    abbonamento:Abbonamento;
    image:string;
    schede:Scheda[];
}

