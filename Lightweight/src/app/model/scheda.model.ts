import { Esercizio } from "./esercizio.model";

export interface Scheda {
    id:string;
    esercizi:Esercizio[];
    nome:string;
}