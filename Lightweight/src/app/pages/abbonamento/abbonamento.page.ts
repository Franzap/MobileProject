import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-abbonamento',
  templateUrl: './abbonamento.page.html',
  styleUrls: ['./abbonamento.page.scss'],
})
export class AbbonamentoPage implements OnInit {

  public user: User = this.usercommunication.createEmptyUser();
  //true:abbonamento ancora attivo, false:abbonamento scaduto
  public isActive: boolean = false;
  //data del primo abbonamento
  public startDate: Date = new Date();
  //data scadenza
  public endDate: Date = new Date();



  constructor(public usercommunication: UserService) { }

  ngOnInit() {
    this.checkSubscriptionStatus();
  }

  //modifica le variabili inizializzate sopra con i valori relativi all'abbonamento dell'Utente
  checkSubscriptionStatus() {
    this.usercommunication.getUser().subscribe(res => {
      this.user = res;
      if (this.user.abbonamento.dataPrimoAbbonamento != null) {
        this.startDate = this.user.abbonamento.dataPrimoAbbonamento.toDate();
      }
      if (this.user.abbonamento.dataScadenza != null) {
        this.endDate = this.user.abbonamento.dataScadenza.toDate();
        if (this.user.abbonamento.dataScadenza.toDate() > new Date()) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      }
    });
  }
}
