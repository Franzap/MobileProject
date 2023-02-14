import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticazione.service';
import { User } from 'src/app/model/user.model';
import { Abbonamento } from 'src/app/model/abbonamento.model';
import { UserService } from 'src/app/services/user.service';
import { userInfo } from 'os';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

public uid:string="";
  public user:User = {
    uid:"",
    email:"",
    displayName:"",
    abbonamento :{
      stato:false,
      dataPrimoAbbonamento:null,
      dataScadenza:null,
      certificato:false,
      assicurazione:false
    },
    image:""
  }

  constructor(private router: Router, private route: ActivatedRoute ,
    public usercommunication:UserService,private toastController: ToastController) { }

  ngOnInit() {this.start()}

  start(){
    const uid =this.route.snapshot.queryParamMap.get('uid');
    if(uid!=null){
      this.uid=uid;
      this.usercommunication.getUserbyId(uid).subscribe(res =>{
        this.user = res;
      });
    }
  }

  vaiAbb(){
    const params : NavigationExtras = {
      queryParams: {
        uid:this.uid,
      
      }
  };
  if(this.user.abbonamento.stato==true){
    this.router.navigate(['/tabs/abbonamento'],params);
   }else{
    this.presentToast();
   // this.router.navigate(['/tabs/home']);
   }
  
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Nessun abbonamento rilevato!',
        duration: 3000,
        position:'middle',
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
   
  

