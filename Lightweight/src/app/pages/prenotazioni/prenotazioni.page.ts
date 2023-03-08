import { Component, OnInit } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/autenticazione.service';

import { Abbonamento } from 'src/app/model/abbonamento.model';
import { UserService } from 'src/app/services/user.service';
import { Timestamp } from 'firebase/firestore';
import { ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';




@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
})
export class PrenotazioniPage implements OnInit {

  public activeP: Date[] = [];
  public a: Date[] = [];//this.removeDuplicates(this.activeP);
  public pastP: Date[] = [];
  public isFirstP: boolean = true;
  public user: User = this.usercommunication.createEmptyUser();
  public dateP: Date = new Date();
  public startd: string = "0";
  public endd: string = "0";
  public start: string = "0";
  public end: string = "0";

  public isModalOpen: boolean = false;
  constructor(public route: ActivatedRoute, public usercommunication: UserService,
    private toastController: ToastController, public router: Router,
    public actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {
    this.initDateTime();

    this.Start();


  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    //this.usercommunication.updateUser(this.user);
    //this.activeP=[];
    //this.pastP=[];





  }

  async confirm(d: IonDatetime) {

    await d.confirm();





    if (d.value != null && d.value != undefined && typeof d.value == "string") {

      // d.confirm();
      var a: Date = new Date(d.value);
      this.dateP = a;
      //this.presentToast("Risulta già una prenotazione per la data selezionata!", "danger");
      var myTimestamp = Timestamp.fromDate(a);
      var b = false;
      // if(this.activeP.length >0)
      for (var p of this.activeP) {
        if ((p.getDate() == a.getDate() &&
          p.getMonth() == a.getMonth() &&
          p.getFullYear() == a.getFullYear())) {
          b = true;

        }
      }

      if (b == true) {
        this.presentToast("Risulta già una prenotazione per la data selezionata!", "danger");
      } else {
        //this.setOpen(false);
        this.user.prenotazioni.push(myTimestamp);

        await this.usercommunication.updateUser(this.user);
        this.activeP = [];
        this.pastP = [];



        //this.router.navigate(['/tabs/home']);

        this.presentToast("Prenotazione effettuata!", "success");
        this.setOpen(false);



      }
    }
  }



  // window.alert(a.getDate());

  removeDuplicates(inArray: Date[]) {
    var arr = inArray.concat() // create a clone from inArray so not to change input array
    //create the first cycle of the loop starting from element 0 or n
    for (var i = 0; i < arr.length; ++i) {
      //create the second cycle of the loop from element n+1
      for (var j = i + 1; j < arr.length; ++j) {
        //if the two elements are equal , then they are duplicate
        if (arr[i] === arr[j]) {
          arr.splice(j, 1); //remove the duplicated element 
        }
      }
    }
    return arr;
  }













  Start() {

    
    console.log(this.activeP);
    

    const uid = this.route.snapshot.queryParamMap.get('uid');

    this.usercommunication.getUserbyId(uid).subscribe(res => {
      this.user = res;
      this.activeP=[];
      this.pastP=[];

      if (this.user.prenotazioni.length > 0) {
        this.isFirstP = false;
      } else { this.isFirstP = true; }
      for (var p of this.user.prenotazioni) {
        if (new Date() > p.toDate()) {

          this.pastP.push(p.toDate());

        } else {

          this.activeP.push(p.toDate());

        }
      }


    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'middle',
      color: color,

      buttons: [
        {
          text: 'Annulla',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  initDateTime() {
    var t = new Date().getMonth() + 1;
    var t1;
    var t2 = new Date().getDate();
    if (t2 < 21) {
      t1 = t;
    } else { t1 = t + 1; }
    var t3;
    if (t2 < 21) { t3 = t2 + 7 } else { t3 = 7; }
    //var t3=new Date().getDate() +7 ;

    this.start = this.start + t.toString();
    this.end = this.end + t1.toString();
    if (t2 < 10) {
      this.startd = this.startd + t2.toString();
    } else {
      this.startd = t2.toString();
    }
    if (t3 < 10) {
      this.endd = this.endd + t3.toString();
    } else {
      this.endd = t3.toString();
    }
  }

 async remove(p:Date){
//this.activeP.splice(this.activeP.indexOf(p),1);
var temp = Timestamp.fromDate(p);


var b=false;
for(var t of this.user.prenotazioni ){
  if(t.isEqual(temp)){
    b=true;
    temp=t;
  }
}
if(b==true){
 
  this.user.prenotazioni.splice(this.user.prenotazioni.indexOf(temp),1);
  await this.usercommunication.updateUser(this.user);}
 //else{window.alert("error");}
  }

  async presentActionSheet(p:Date) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Vuoi disdire questa prenotazione?',
      cssClass: 'my-custom-class',
      buttons: [
       
        {
          text: 'Okay',
          handler: () =>{
            this.remove(p);
            this.PresentToast();
            
            
            
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

  async PresentToast() {
    const toast = await this.toastController.create({
      message: 'Prenotazione cancellata correttamente',
      duration: 3000,
      position: 'middle',
      color: 'success',

      buttons: [
        {
          text: 'Annulla',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  prova(){
    console.log("ciao");
  }
}
