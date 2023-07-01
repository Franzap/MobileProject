import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { Esercizio } from 'src/app/model/esercizio.model';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Scheda } from 'src/app/model/scheda.model';

@Component({
  selector: 'app-open-scheda',
  templateUrl: './open-scheda.page.html',
  styleUrls: ['./open-scheda.page.scss'],
})
export class OpenSchedaPage implements OnInit {
  public user: User = this.usercommunication.createEmptyUser();
  //Dati relativi all'esercizio selezionata
  public currentTitle: string = "";
  public currentImage: string = "";
  public currentDescrizione: string = "";
  //booleano di controllo per l'Ion Modal
  public isModalOpen = false;
  //schede dell'Utente
  public schede: Scheda[] = [];
  //index nell'array delle schede della scheda selezionata
  public i: number | null = null;
  //esercizi presenti nella scheda selezionata
  public currentEsercizi: Esercizio[] = [];

  constructor(public route: ActivatedRoute,
    public usercommunication: UserService,
    public router: Router,
    private actionSheetCtrl: ActionSheetController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.returnUserForm();
  }
  //modifica le variabili inizializzate sopra con i valori relativi alla scheda selezionata
  returnUserForm() {
    const index = this.route.snapshot.queryParamMap.get('index');
    this.usercommunication.getUser().subscribe(res => {
      this.user = res;
      this.schede = res.schede;
      if (index != null) {
        this.i = +index;
        if (this.schede.length > 0) {
          this.currentEsercizi = this.schede[this.i].esercizi;
        }
      }
    });
  }
  //modifica i valori del booleano che controlla apertura e chiusura dell'IonModal
  setOpen(isOpen: boolean, e: Esercizio) {
    this.isModalOpen = isOpen;
    if (isOpen == true) {
      this.currentImage = e.immagine;
      this.currentDescrizione = e.descrizione;
      this.currentTitle = e.nome;
    }
  }

  modifica() {
    const params: NavigationExtras = {
      queryParams: {
        index: this.i
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
          handler: () => {
            if (this.i != null) {
              this.user.schede.splice(this.i, 1);
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
