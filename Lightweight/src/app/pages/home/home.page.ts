import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticazione.service';
import { User } from 'src/app/model/user.model';
import { Abbonamento } from 'src/app/model/abbonamento.model';
import { UserService } from 'src/app/services/user.service';
import { OrariService } from 'src/app/services/orari.service';
import { Orari } from 'src/app/model/orari.model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { userInfo } from 'os';
import { Esercizio } from 'src/app/model/esercizio.model';
import { EserciziService } from 'src/app/services/esercizi.service';
import { ActionSheetController } from '@ionic/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import  { EffectFade } from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { Scheda } from 'src/app/model/scheda.model';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {










  
  public schede:Scheda[] = [];

  public IsOpen:boolean = false;
  public giorniAbbonamentoRimasti:number=0;
 
  public esercizi:Esercizio[] = [];
  
  
  public orari:Orari={
    apertura:new Timestamp(0,0),
    chiusura:new Timestamp(0,0)
  }
  public oraApertura :number = 0;
  public minutiApertura : string = "";
  public oraChiusura : number = 0;
  public minutiChiusura : string = "";

  public user : User = this.usercommunication.createEmptyUser();

  constructor( private router: Router, private route: ActivatedRoute ,
      public usercommunication:UserService, public timecommunication:OrariService,
      public exercisecommunication:EserciziService,private actionSheetCtrl: ActionSheetController) { }

   ngOnInit() {
    this.returnUser();
    this.isOpen();
    
    

  }
  returnUser() {
    const uid =this.route.snapshot.queryParamMap.get('uid');
    this.usercommunication.getUserbyId(uid).subscribe(res =>{
    this.user = res;
    this.schede = res.schede;
    this.isAbbonato();
   
   });
  }
  
 isOpen(){
    
    this.timecommunication.getTimeTablesbyId("orario").subscribe(res =>{
    this.orari = res;
    const apertura =this.orari.apertura.toDate();
    const chiusura = this.orari.chiusura.toDate();
    if(new Date() >apertura &&
    new Date()<chiusura){
    this.IsOpen = true;
    }
    else{
      this.IsOpen = false;
    }
    this.oraApertura = apertura.getHours();
    this.oraChiusura = chiusura.getHours();
    if( apertura.getMinutes() <10){
      this.minutiApertura="0"+apertura.getMinutes().toString();
    }else{
      this.minutiApertura= apertura.getMinutes().toString();
    };
    if( chiusura.getMinutes() <10){
      this.minutiChiusura="0"+chiusura.getMinutes().toString();
    }
      else{
        this.minutiChiusura = chiusura.getMinutes().toString();

      }
    
    
    
  });
}

userNavigate(){
  
  const params : NavigationExtras = {
    queryParams: {
      uid:this.user.uid,
    email:this.user.email,
    displayName:this.user.displayName,
    abbonamento :this.user.abbonamento,
    image:this.user.image
    }
};
this.router.navigate(['/profile'],params);


}

isAbbonato(){
  var scadenza = this.user.abbonamento.dataScadenza;
  if(scadenza!=null){
    var dataScadenza = scadenza.toDate();
    var todayDate = new Date();
    var utc1 = Date.UTC(dataScadenza.getFullYear(), dataScadenza.getMonth(), dataScadenza.getDate());
    var utc2 = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    const diffInDays = Math.floor((utc1-utc2) / (1000 * 60 * 60 * 24));
    if(diffInDays > 0){
      this.giorniAbbonamentoRimasti = diffInDays;
     
     
    }else{
      this.giorniAbbonamentoRimasti=0;
    }
   
}
}

tabsNavigate(){
  
  const params : NavigationExtras = {
    queryParams: {
      uid:this.user.uid,
    email:this.user.email,
    displayName:this.user.displayName,
    abbonamento :this.user.abbonamento,
    image:this.user.image
    }
};
this.router.navigate(['/abbonamento'],params);


}

/*provaEsercizi() { 
 this.exercisecommunication.getAllExercises().subscribe(res =>{
  this.esercizi=res;
  window.alert(this.esercizi[0].descrizione + this.esercizi[1].descrizione)
 });

}*/
async presentActionSheet() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Vuoi creare una nuova scheda?',
    cssClass: 'my-custom-class',
    buttons: [
     
      {
        text: 'Okay',
        handler: () =>{
          const params : NavigationExtras = {
            queryParams: {
              uid:this.user.uid
            }
          };
          this.router.navigate(['/creazione-scheda'], params);
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





