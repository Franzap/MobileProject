import { Component, OnInit } from '@angular/core';
import { Esercizio } from 'src/app/model/esercizio.model';
import { EserciziService } from 'src/app/services/esercizi.service';
import { RangeCustomEvent } from '@ionic/angular';
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
  public user: User = this.usercommunication.createEmptyUser();
  public scheda: Scheda = this.createEmptyScheda();
  //index della scheda selezionata
  public currentIndex: number = -1;
  //true:scheda già esistente,false:nuova scheda
  public isModifica: boolean = false;
  //title scheda
  public title: string = "";
  //dati relativi all'esercizio selezionato
  public currentTitle: string = "";
  public currentImage: string = "";
  public currentDescrizione: string = "";
  public isModalOpen = false;
  //lista degli esercizi presenti nel DB
  public esercizi: Esercizio[] = [];
  //esercizi presenti nella scheda
  public currentEsercizi: Esercizio[] = [];
  public newEsercizi: Esercizio[] = [];
  //tipologia selezionata
  public currentType: any = {
    id: "",
    name: '',
    img: ''
  };
  //tipologie scheda
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


  constructor(private exercisecommunication: EserciziService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private usercommunication: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnAll();
  }

  //prende dal DB tutte le informazioni necessarie
  returnAll() {
    this.exercisecommunication.getAllExercises().subscribe(res => {
      this.esercizi = res;
      for (var e of this.esercizi) {
        e.nReps = 0;
        e.nSerie = 0;
      }
      this.returnUserScheda();
    });
  }
  //modifica tutte le variabili relative alla scheda selezionata con i valori adeguati presi dal DB
  returnUserScheda() {
    const index = this.route.snapshot.queryParamMap.get('index');
    this.usercommunication.getUser().subscribe(res => {
      this.user = res;
      if (index != null) {
        this.currentIndex = +index;
        this.isModifica = true;
        this.title = this.user.schede[+index].nome;
        this.currentEsercizi = this.user.schede[+index].esercizi;
        this.currentType.name = this.user.schede[+index].tipologia;
        this.currentType.img = this.user.schede[+index].immagine;
        this.scheda = this.user.schede[+index];
        for (var E of this.currentEsercizi) {
          for (var e of this.esercizi) {
            if (e.id === E.id) {
              this.esercizi.splice(this.esercizi.indexOf(e), 1);
            }
          }
        }
      }
    });
  }

  handleChangeType(ev: any) {
    this.currentType = ev.target.value;
  }

  handleChangeExercises(ev: any) {
    if (this.isModifica == false) {
      this.currentEsercizi = ev.target.value;
    } else {
      this.newEsercizi = ev.target.value;
      if (this.newEsercizi.length == 0) {
        this.currentEsercizi = this.scheda.esercizi;
      }
      if (this.newEsercizi.length != 0) {
        if (this.currentEsercizi.length == this.scheda.esercizi.length) {
          this.currentEsercizi = this.currentEsercizi.concat(this.newEsercizi);
        } else {
          this.currentEsercizi = this.scheda.esercizi;
          this.currentEsercizi = this.currentEsercizi.concat(this.newEsercizi);
        }
      }
    }
  }

  onIonChangeSerie(ev: Event, e: Esercizio) {
    var temp = (ev as RangeCustomEvent).detail.value.toString();
    e.nSerie = +temp;
  }

  onIonChangeReps(ev: Event, e: Esercizio) {
    var temp = (ev as RangeCustomEvent).detail.value.toString();
    e.nReps = +temp;
  }

  setOpen(isOpen: boolean, e: Esercizio) {
    this.isModalOpen = isOpen;
    if (isOpen == true) {
      this.currentImage = e.immagine;
      this.currentDescrizione = e.descrizione;
      this.currentTitle = e.nome;
    }

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Vuoi tornare indietro?',
      subHeader: 'Tutte le modifiche andranno perse!',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            if (this.isModifica == true) {
              this.router.navigate(['/open-scheda']);
            } else {
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

  //crea una nuova scheda o modifica la scheda già esistente
  save() {
    if (this.isModifica == false) {
      var temporaryScheda = this.createEmptyScheda();
      temporaryScheda.nome = this.title;
      temporaryScheda.tipologia = this.currentType.name;
      temporaryScheda.immagine = this.currentType.img;
      temporaryScheda.esercizi = this.currentEsercizi;
      this.user.schede.push(temporaryScheda);
      this.usercommunication.updateUser(this.user);
      this.router.navigate(['/tabs/home'])
    }
    else {
      this.user.schede[this.currentIndex].nome = this.title;
      this.user.schede[this.currentIndex].tipologia = this.currentType.name;
      this.user.schede[this.currentIndex].immagine = this.currentType.img;
      this.user.schede[this.currentIndex].esercizi = this.currentEsercizi;
      this.usercommunication.updateUser(this.user);
      this.router.navigate(['/tabs/home'])
    }
  }
  createEmptyScheda(): Scheda {
    var scheda: Scheda = {
      tipologia: "",
      esercizi: [],
      immagine: "",
      nome: ""
    }
    return scheda;
  }

  //elimina un esercizio dalla scheda 
  async elimina(e: Esercizio) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Vuoi eliminare questo esercizio?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            e.nReps = 0;
            e.nSerie = 0;
            this.scheda.esercizi.splice(this.currentEsercizi.indexOf(e), 1);
            if (this.currentEsercizi.length != this.scheda.esercizi.length) {
              this.currentEsercizi.splice(this.currentEsercizi.indexOf(e), 1);
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
