import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/autenticazione.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public newUsername: any = "";
  public user: User = this.usercommunication.createEmptyUser();
  constructor(private router: Router,
    public usercommunication: UserService,
    public auth: AuthenticationService) { }

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    this.usercommunication.getUser().subscribe(res => {
      this.user = res;
    });
  }

  save() {
    if (this.newUsername !== this.user.displayName) {
      this.user.displayName = this.newUsername;
    }
    this.usercommunication.updateUser(this.user);
    this.router.navigate(['/tabs/home']);
  }

  async logout() {
    await this.auth.SignOut();
    localStorage.clear();
  }
}
