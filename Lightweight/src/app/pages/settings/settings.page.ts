import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public language = ""; 
  constructor(private _translate: TranslateService , private router : Router){}

  ngOnInit(): void {
   // window.alert("settings");
    var savedLanguage = localStorage.getItem("language");
    if(savedLanguage !=null){
      this.language = savedLanguage;
    }else {
      this.language = "en";
    }
  }
  public changeLanguage(): void {
    localStorage.setItem("language", this.language);
    this._translate.use(this.language);
   //this.router.navigate(['/login']);
  
//navigator.splashscreen.show();
// Reload original app url (ie your index.html file)
/*window.location = initialHref;
navigator.splashscreen.hide();*/
    
  }

  
 


}
