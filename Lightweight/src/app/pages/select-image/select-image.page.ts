import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.page.html',
  styleUrls: ['./select-image.page.scss'],
})
export class SelectImagePage implements OnInit {

  public user: User = this.communicationService.createEmptyUser();

  items = [
    { id: 0, value: "assets/Cena.png" },
    { id: 1, value: "assets/TheRock.png" },
    { id: 2, value: "assets/Ronnie.png" },
    { id: 3, value: "assets/Arnold.png" },
    { id: 4, value: "assets/BobParis.png" },
    { id: 5, value: "assets/LouFerrigno.png" },
    { id: 6, value: "assets/media.png" },
    { id: 7, value: "assets/FrancisBenfatto.png" },
    { id: 8, value: "assets/FrancoColumbu.png" },
    { id: 9, value: "assets/Donna1.png" },
    { id: 10, value: "assets/Donna2.png" },
    { id: 11, value: "assets/Donna3.png" },
    { id: 12, value: "assets/Donna4.png" },
    { id: 13, value: "assets/Donna5.png" },
    { id: 14, value: "assets/Donna6.png" },
  ]
  constructor(private router: Router, private communicationService: UserService) { }

  ngOnInit() {
    this.initUser();
  }

  //aggiorna l'utente con l'immagine selezionata e ritorna nell'Home Page
  selected(item: string): void {
    this.user.image = item;
    this.communicationService.updateUser(this.user);
    this.router.navigate(['/tabs/home']);
  }

  initUser() {
    this.communicationService.getUser().subscribe(res => {
      this.user = res;
    });
  }
}
