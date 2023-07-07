import { Component, OnInit } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { Timestamp } from 'firebase/firestore';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { PrenotazioniService } from 'src/app/services/prenotazioni.service';
import { Prenotazione } from 'src/app/model/prenotazione.model';


@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
})
export class PrenotazioniPage implements OnInit {
  public user: User = this.usercommunication.createEmptyUser();
  //prenotazioni attive
  public activeP: Date[] = [];
  //prenotazioni precedenti
  public pastP: Date[] = [];
  //true:prima prenotazione, false:no
  public isFirstP: boolean = true;
  //valori relativi alla prima e all'ultima data prenotabile 
  public startDay: string = "0";
  public endDay: string = "0";
  public startMonth: string = "0";
  public endMonth: string = "0";
  public startYear: string = new Date().getFullYear().toString();
  public endYear: string = new Date().getFullYear().toString();
  //booleano che controlla apertura e chiusura dell'IOnModal
  public isModalOpen: boolean = false;


  constructor(private usercommunication: UserService,
    private toastController: ToastController,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private prenotazionicommunication:PrenotazioniService) { }

  ngOnInit() {
    this.initDateTime();
    this.returnUserPrenotations();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //conferma prenotazione
  async confirm(d: IonDatetime) {
    await d.confirm();
    if (d.value != null && d.value != undefined && typeof d.value == "string") {
      var a: Date = new Date(d.value);
      var myTimestamp = Timestamp.fromDate(a);
      var b = false;
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
       

        

        this.user.prenotazioni.push(myTimestamp);
        await this.usercommunication.updateUser(this.user);
        this.prenotazionicommunication.updatePrenotazione(this.user);
        this.activeP = [];
        this.pastP = [];
        this.presentToast("Prenotazione effettuata!", "success");
        this.setOpen(false);

      }
    }
  }

  //modifica le variabili definite sopra con i dati relativi alle prenotazioni dell'Utente
  returnUserPrenotations() {
    this.usercommunication.getUser().subscribe(res => {
      this.user = res;
      this.activeP = [];
      this.pastP = [];
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

  //modifica i dati relativi alle date prenotabili in base al giorno corrente
  initDateTime() {
    var t = new Date().getMonth() + 1;
    var t1;
    var t2 = new Date().getDate();
    if (t2 < 21) {
      t1 = t;
    } else { t1 = t + 1; }
    var t3;
    if (t2 < 21) { t3 = t2 + 7 } else { t3 = 7; }
    this.startMonth = this.startMonth + t.toString();
    this.endMonth = this.endMonth + t1.toString();
    if (t2 < 10) {
      this.startDay = this.startDay + t2.toString();
    } else {
      this.startDay = t2.toString();
    }
    if (t3 < 10) {
      this.endDay = this.endDay + t3.toString();
    } else {
      this.endDay = t3.toString();
    }
    if (new Date().getMonth() == 11) {
      var endYear = new Date().getFullYear() + 1;
      this.endYear = endYear.toString();
    }
  }

  //rimuove una prenotazione
  async remove(p: Date) {
    var temp = Timestamp.fromDate(p);
    var b = false;
    for (var t of this.user.prenotazioni) {
      if (t.isEqual(temp)) {
        b = true;
        temp = t;
      }
    }
    if (b == true) {
      this.user.prenotazioni.splice(this.user.prenotazioni.indexOf(temp), 1);
      await this.usercommunication.updateUser(this.user);
      this.prenotazionicommunication.updatePrenotazione(this.user);

     // this.prenotazionicommunication.removePrenotazione()
    }
  }

  async presentActionSheet(p: Date) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Vuoi disdire questa prenotazione?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
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
}
