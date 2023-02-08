import { Component, OnInit,  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticazione.service';
import { User } from 'src/app/model/user.model';
import { Abbonamento } from 'src/app/model/abbonamento.model';
import { UserService } from 'src/app/services/user.service';
import { OrariService } from 'src/app/services/orari.service';
import { Orari } from 'src/app/model/orari.model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { serverTimestamp, Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public IsOpen:boolean = false;
 
  
  
  public orari:Orari={
    apertura:new Timestamp(0,0),
    chiusura:new Timestamp(0,0)
  }
  public oraApertura :number = 0;
  public minutiApertura : string = "";
  public oraChiusura : number = 0;
  public minutiChiusura : string = "";

  

  public abb:Abbonamento = {
    descrizione : "ciao",
    stato : true
}
  public user:User = {
    uid:"",
    email:"",
    displayName:"",
    abbonamento :{
      descrizione:"",
      stato:false
    },
    image:""
  }

  
 
  constructor( private router: Router, private route: ActivatedRoute ,
      public usercommunication:UserService, public timecommunication:OrariService) { }

   ngOnInit() {
    this.returnUsername();
    this.isOpen();
    //window.alert(this.user.image);
    //window.alert(this.user.displayName);
    

  }
  returnUsername() {
    const uid =this.route.snapshot.queryParamMap.get('uid');
    this.usercommunication.getUserbyId(uid).subscribe(res =>{
    this.user = res;
    /*const d = document.getElementById("username");
    if(d!=null){
     d.innerHTML = this.user.displayName; 
     }
     */
   });
  }
  
 isOpen(){
    
    this.timecommunication.getTimeTablesbyId("orario").subscribe(res =>{
    this.orari = res;
    const apertura =this.orari.apertura.toDate();
    const chiusura = this.orari.chiusura.toDate();
    if(new Date() >apertura &&
    new Date()<chiusura){
    this.IsOpen = true;
    }
    else{
      this.IsOpen = false;
    }
    this.oraApertura = apertura.getHours();
    this.oraChiusura = chiusura.getHours();
    if( apertura.getMinutes() <10){
      this.minutiApertura="0"+apertura.getMinutes().toString();
    }else{
      this.minutiApertura= apertura.getMinutes().toString();
    };
    if( chiusura.getMinutes() <10){
      this.minutiChiusura="0"+chiusura.getMinutes().toString();
    }
      else{
        this.minutiChiusura = chiusura.getMinutes().toString();

      }
    
    
    
  });
}

userNavigate(){
  
  const params : NavigationExtras = {
    queryParams: {
      uid:this.user.uid,
    email:this.user.email,
    displayName:this.user.displayName,
    abbonamento :this.user.abbonamento,
    image:this.user.image
    }
};
this.router.navigate(['/profile'],params);

//this.router.navigate(['/profile']);
}


}
