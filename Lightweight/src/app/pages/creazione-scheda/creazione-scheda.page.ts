import { Component, OnInit } from '@angular/core';
import { Esercizio } from 'src/app/model/esercizio.model';
import { EserciziService } from 'src/app/services/esercizi.service';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creazione-scheda',
  templateUrl: './creazione-scheda.page.html',
  styleUrls: ['./creazione-scheda.page.scss'],
})
export class CreazioneSchedaPage implements OnInit {

  public currentTitle:string="";
  public currentImage:string="";
  public currentDescrizione:string="";

  public isModalOpen = false;
  public lastEmittedValue: RangeValue=0;
  public LastEmittedValue: RangeValue=0;


  public esercizi:Esercizio[] = [];
  
  public currentEsercizi :Esercizio[]=[];

  public currentType :any ={
    id:"",
    name:'',
    img:''
  };

  types = [
    {
      id: 1,
      name: 'forza',
      img: 'assets/forza.png',
    },
    {
      id: 2,
      name: 'esplosività',
      img: 'assets/esplosività.png',
    },
    {
      id: 3,
      name: 'dimagrimento',
      img: 'assets/dimagrimento.png',
    },
  ];

  
  constructor(public exercisecommunication:EserciziService,private actionSheetCtrl: ActionSheetController,
    private router: Router) { }

  ngOnInit() {
    this.provaEsercizi();
  }
 

  handleChange(ev:any) {
    this.currentType = ev.target.value;
  }

  provaEsercizi() { 
    this.exercisecommunication.getAllExercises().subscribe(res =>{
     this.esercizi=res;
     
    });
   
   }
   HandleChange(ev:any) {
    this.currentEsercizi = ev.target.value;
    
  }
  onIonChange(ev: Event, e:Esercizio) {
    //this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    e.nSerie=(ev as RangeCustomEvent).detail.value.toString()
  }
  
  OnIonChange(ev: Event , e:Esercizio) {
   // this.LastEmittedValue = (ev as RangeCustomEvent).detail.value;
    e.nReps=(ev as RangeCustomEvent).detail.value.toString()
  }

  setOpen(isOpen: boolean , e:Esercizio) {
    this.isModalOpen = isOpen;
    this.currentImage= e.immagine;
    this.currentDescrizione= e.descrizione;
    this.currentTitle = e.nome;

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Vuoi tornare indietro?',
      subHeader: 'Tutte le modifiche andranno perse!',
      cssClass: 'my-custom-class',
      buttons: [
       
        {
          text: 'Okay',
          handler: () =>{
            this.router.navigate(['/tabs/home']);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
  
    actionSheet.present();
  }
  
}
