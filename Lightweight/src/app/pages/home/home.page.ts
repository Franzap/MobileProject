import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticazione.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { OrariService } from 'src/app/services/orari.service';
import { EserciziService } from 'src/app/services/esercizi.service';
import { ActionSheetController } from '@ionic/angular';
import { Scheda } from 'src/app/model/scheda.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //riferimenti ai valori dell'utente e alla "palestra" da mostrare 

  public user: User = this.usercommunication.createEmptyUser();

  //palestra aperta:true o chiusa:false
  public IsOpen: boolean = false;

  //giorni rimanenti alla scadenza dall'abbonamento
  public giorniAbbonamentoRimasti: number = 0;

  //stringhe che vengono mostrate per mostrare rispettivamente gli orari di apertura e chiusura
  public stringApertura: string = "";
  public stringChiusura: string = "";

  constructor(private router: Router,
    public usercommunication: UserService, public timecommunication: OrariService,
    public exercisecommunication: EserciziService, private actionSheetCtrl: ActionSheetController,
    public auth: AuthenticationService) { }


  //recupera dal DB i valori relativi all'utente e alla palestra e inizializza con quei valori le variabili 
  //locali definite sopra
  ngOnInit() {
    this.initUser();
    this.setTimeTables();
  }

  initUser() {
    this.usercommunication.getUserbyId().subscribe(res => {
      this.user = res;
      this.isAbbonato()
    });
  }
  //recupera dal Db gli orari della palestra e modifica le stringhe definite sopra con i valori appropriati
  setTimeTables() {
    this.timecommunication.getTimeTablesbyId("orario").subscribe(res => {
      const apertura = res.apertura.toDate();
      const chiusura = res.chiusura.toDate();
      if (new Date() > apertura &&
        new Date() < chiusura) {
        this.IsOpen = true;
      }
      else {
        this.IsOpen = false;
      }

      var minutiApertura;
      var minutiChiusura;
      var oraApertura = apertura.getHours().toString();
      var oraChiusura = chiusura.getHours().toString();
      if (apertura.getMinutes() < 10) {
        minutiApertura = "0" + apertura.getMinutes().toString();
      } else {
        minutiApertura = apertura.getMinutes().toString();
      };
      if (chiusura.getMinutes() < 10) {
        minutiChiusura = "0" + chiusura.getMinutes().toString();
      }
      else {
        minutiChiusura = chiusura.getMinutes().toString();
      }
      var stringApertura = oraApertura + ":" + minutiApertura;
      var stringChiusura = oraChiusura + ":" + minutiChiusura;
      this.stringApertura = stringApertura;
      this.stringChiusura = stringChiusura;
    });
  }
  //verifica se l'utente è abbonato e in caso positivo modifica la variabile relativa ai giorni di abbonamento 
  //rimanenti con il valore corretto
  isAbbonato() {
    var scadenza = this.user.abbonamento.dataScadenza;
    if (scadenza != null) {
      var dataScadenza = scadenza.toDate();
      var todayDate = new Date();
      var utc1 = Date.UTC(dataScadenza.getFullYear(), dataScadenza.getMonth(), dataScadenza.getDate());
      var utc2 = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
      const diffInDays = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
      if (diffInDays > 0) {
        this.giorniAbbonamentoRimasti = diffInDays;
      } else {
        this.giorniAbbonamentoRimasti = 0;
      }
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Vuoi creare una nuova scheda?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/creazione-scheda']);
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
  //se l'utente clicca su una scheda entra nella schermata relativa alla scheda selezionata
  navigateToScheda(s: Scheda) {
    var a = this.user.schede.indexOf(s);
    const params: NavigationExtras = {
      queryParams: {
        index: a
      }
    };
    this.router.navigate(['/open-scheda'], params);
  }
}





