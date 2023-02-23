import { Esercizio } from "./esercizio.model";

export interface Scheda {
    tipologia:string;
    esercizi:Esercizio[];
    nome:string;
    immagine:string
}