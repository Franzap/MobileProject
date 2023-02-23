import { Component, OnInit } from '@angular/core';
import { Esercizio } from 'src/app/model/esercizio.model';
import { EserciziService } from 'src/app/services/esercizi.service';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Scheda } from 'src/app/model/scheda.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creazione-scheda',
  templateUrl: './creazione-scheda.page.html',
  styleUrls: ['./creazione-scheda.page.scss'],
})
export class CreazioneSchedaPage implements OnInit {

  public user : User = this.usercommunication.createEmptyUser();
  

  //title scheda
  public title:string = "";

  //about ex
  public currentTitle:string="";
  public currentImage:string="";
  public currentDescrizione:string="";

  public isModalOpen = false;
  //nserie
  public lastEmittedValue: RangeValue=0;
  //nreps
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
    private router: Router, public usercommunication:UserService, public route:ActivatedRoute) { }

  ngOnInit() {
    this.provaEsercizi();
    this.returnUser();
  }

  returnUser() {
    const uid =this.route.snapshot.queryParamMap.get('uid');
    this.usercommunication.getUserbyId(uid).subscribe(res =>{
    this.user = res;
    
    
   });
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
  onIonChangeSerie(ev: Event, e:Esercizio) {
    //this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var temp =(ev as RangeCustomEvent).detail.value.toString();
    e.nSerie = +temp;
  }
  
  onIonChangeReps(ev: Event , e:Esercizio) {
   // this.LastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var temp =(ev as RangeCustomEvent).detail.value.toString();
    e.nReps = +temp;
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

  save(){
    /*let a = "";
    a= a + this.title + "\n" + this.currentType.name + "\n";
    for( var i of this.currentEsercizi){
      a = a + i.nome  + "-" + i.nSerie + "-" +  i.nReps + "\n";
    

    }
    
    window.alert(a);
    */
    var temporaryScheda = this.createEmptyScheda();
    temporaryScheda.nome=this.title;
    temporaryScheda.tipologia=this.currentType.name;
    temporaryScheda.immagine=this.currentType.img;
    temporaryScheda.esercizi=this.currentEsercizi;
    this.user.schede.push(temporaryScheda);
    this.usercommunication.updateUser(this.user);
    this.router.navigate(['/tabs/home'])
   
   /* window.alert(this.user.schede[0].nome);
    window.alert(this.user.schede[0].immagine);
    window.alert(this.user.schede[0].tipologia);
    */
  }
  
createEmptyScheda() : Scheda {

  var scheda:Scheda = {

    tipologia:"",
    esercizi : [],
    immagine : "",
    nome :  ""
  }


  return scheda;
}
  
  
}
