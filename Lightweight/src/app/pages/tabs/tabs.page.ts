import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/autenticazione.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  //creo un utente con valori di default
  public user: User = this.usercommunication.createEmptyUser();

  constructor(private usercommunication: UserService,
    private toastController: ToastController,
    private auth: AuthenticationService) { }

  async ngOnInit() {
    this.initUser();
  }
  //inizializzo user con gli attributi dell'Utente memorizzati nel DB
  initUser() {
    this.usercommunication.getUser().subscribe(res => {
      this.user = res;
    });
  }
  //utilizzato cliccando sulla tab Abbonamento se l'Utente non ha un abbonamento
  NoAbb() {
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Nessun abbonamento rilevato!',
      duration: 3000,
      position: 'middle',
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



