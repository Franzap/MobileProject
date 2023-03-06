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

  public scheda:Scheda=this.createEmptyScheda();
  public currentIndex : number = 0;

  public isModifica : boolean = false;

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
  public newEsercizi : Esercizio[] = [];

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
   // this.provaEsercizi();
    this.returnUser();
  }

  returnUser() {
    const uid =this.route.snapshot.queryParamMap.get('uid');
    const index = this.route.snapshot.queryParamMap.get('index');
    this.exercisecommunication.getAllExercises().subscribe(res =>{
    this.esercizi=res;
    for(var e of this.esercizi){
      e.nReps=0;
      e.nSerie=0;
    }
    
    this.usercommunication.getUserbyId(uid).subscribe(res =>{
    this.user = res;
    if(index!=null){
      this.currentIndex = +index;
      this.isModifica = true;
      this.title=this.user.schede[+index].nome;
      this.currentEsercizi=this.user.schede[+index].esercizi;
      this.currentType.name= this.user.schede[+index].tipologia;
      this.currentType.img= this.user.schede[+index].immagine;
      this.scheda=this.user.schede[+index];
      for(var E of this.currentEsercizi){
        for (var e of this.esercizi){
          
          if (e.id === E.id){
          this.esercizi.splice(this.esercizi.indexOf(e),1);
          //this.esercizi.sort();
        
          }
      }
      
        }
      }
 
   });
  });
}
  

 

  handleChange(ev:any) {
    this.currentType = ev.target.value;
  }

  /*provaEsercizi() { 
    this.exercisecommunication.getAllExercises().subscribe(res =>{
     this.esercizi=res;
     if(this.isModifica==true){
      
     }
     
    });
   
   }
   */
   HandleChange(ev:any) {
    if(this.isModifica==false){
      this.currentEsercizi=ev.target.value;
    }else{
    this.newEsercizi = ev.target.value;
    if(this.newEsercizi.length == 0){
      this.currentEsercizi=this.scheda.esercizi;}
      if(this.newEsercizi.length !=0){
        if(this.currentEsercizi.length==this.scheda.esercizi.length){
         this.currentEsercizi= this.currentEsercizi.concat(this.newEsercizi);
        }else{
          this.currentEsercizi=this.scheda.esercizi;
          this.currentEsercizi = this.currentEsercizi.concat(this.newEsercizi);

          
          }
          
        }
            
            
            
        }
   
         //this.currentEsercizi = this.currentEsercizi.concat(this.newEsercizi);
      }
    
   
    /*this.newEsercizi=ev.target.value;
    //this.esercizi.splice(this.esercizi.indexOf(ev),1);
    this.currentEsercizi.concat(this.newEsercizi);
    */
  
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
            if (this.isModifica == true){
              this.router.navigate(['/open-scheda']);
            }else{
              this.router.navigate(['/tabs/home']);
            }
            
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
   if(this.isModifica==false){

    var temporaryScheda = this.createEmptyScheda();
    temporaryScheda.nome=this.title;
    temporaryScheda.tipologia=this.currentType.name;
    temporaryScheda.immagine=this.currentType.img;
    temporaryScheda.esercizi=this.currentEsercizi;
    this.user.schede.push(temporaryScheda);
    this.usercommunication.updateUser(this.user);
    this.router.navigate(['/tabs/home'])

   }
    else{
      this.user.schede[this.currentIndex].nome=this.title;
      this.user.schede[this.currentIndex].tipologia=this.currentType.name;
      this.user.schede[this.currentIndex].immagine=this.currentType.img;
      this.user.schede[this.currentIndex].esercizi=this.currentEsercizi;
      this.usercommunication.updateUser(this.user);
      this.router.navigate(['/tabs/home'])

    }
   
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
  async elimina(e:Esercizio){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Vuoi eliminare questo esercizio?',
     
      cssClass: 'my-custom-class',
      buttons: [
       
        {
          text: 'Okay',
          handler: () =>{
            e.nReps=0;
            e.nSerie=0;
            //this.currentEsercizi.splice(this.currentEsercizi.indexOf(e),1);
            this.scheda.esercizi.splice(this.currentEsercizi.indexOf(e),1);
            if(this.currentEsercizi.length!=this.scheda.esercizi.length){
              this.currentEsercizi.splice(this.currentEsercizi.indexOf(e),1);
            }
            this.esercizi.push(e);
            
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
