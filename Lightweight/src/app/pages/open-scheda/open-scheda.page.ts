import { Component, OnInit } from '@angular/core';

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
import { ToastController } from '@ionic/angular';

import { Scheda } from 'src/app/model/scheda.model';

@Component({
  selector: 'app-open-scheda',
  templateUrl: './open-scheda.page.html',
  styleUrls: ['./open-scheda.page.scss'],
})
export class OpenSchedaPage implements OnInit {

  public currentTitle:string="";
  public currentImage:string="";
  public currentDescrizione:string="";

  public isModalOpen = false;

  public schede:Scheda[] = [];
  public i : number|null = null ; 
  public currentEsercizi:Esercizio[] =[] ;
  public user : User = this.usercommunication.createEmptyUser();
  constructor(public route:ActivatedRoute, public usercommunication:UserService,public router:Router,
    private actionSheetCtrl: ActionSheetController,private toastController: ToastController
    
    ) { }

  ngOnInit() {
    this.returnUser();
   
   
    
    
  }

  returnUser() {
    const uid =this.route.snapshot.queryParamMap.get('uid');
    const index = this.route.snapshot.queryParamMap.get('index');
    
    this.usercommunication.getUserbyId().subscribe(res =>{
    this.user = res;
    this.schede = res.schede;
    if(index!=null )

    {this.i = +index;
      if(this.schede.length >0){

        this.currentEsercizi=this.schede[this.i].esercizi;
      }
     
    }
   
   });
  
   
   
  }

  clicca(){
    if (this.i!=null){

      window.alert(this.schede[this.i].nome);
  }

}

setOpen(isOpen: boolean , e:Esercizio) {
  this.isModalOpen = isOpen;
  if(isOpen==true){
  this.currentImage= e.immagine;
  this.currentDescrizione= e.descrizione;
  this.currentTitle = e.nome;
  }
}
modifica(){
  const params : NavigationExtras = {
    queryParams: {
      uid:this.user.uid,
      index:this.i
    }
  };
  this.router.navigate(['/creazione-scheda'], params);
}



async presentActionSheet() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Vuoi eliminare questa scheda?',
    subHeader: "L'operazione è irreversibile!",
    cssClass: 'my-custom-class',
    buttons: [
     
      {
        text: 'Okay',
        handler: () =>{
          if(this.i!=null){
            this.user.schede.splice(this.i,1);
            this.usercommunication.updateUser(this.user);
            this.presentToast();
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

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Scheda eliminata!',
    duration: 3000,
    position:'middle',
    color: "danger",
    
    buttons: [
      {
        text: 'Annulla',
        role: 'cancel'
      }
    ],
  });

  await toast.present();
}



}
