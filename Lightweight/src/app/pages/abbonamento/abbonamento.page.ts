import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/autenticazione.service';

import { Abbonamento } from 'src/app/model/abbonamento.model';
import { UserService } from 'src/app/services/user.service';
import { OrariService } from 'src/app/services/orari.service';
import { Orari } from 'src/app/model/orari.model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { serverTimestamp, Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-abbonamento',
  templateUrl: './abbonamento.page.html',
  styleUrls: ['./abbonamento.page.scss'],
})
export class AbbonamentoPage implements OnInit {
//public uid:string="";
public startDate:Date=new Date();
public Start:string="";
public endDate:Date=new Date();
public End:string= "";
public user:User = {
  uid:"",
  email:"",
  displayName:"",
  abbonamento :{
    stato:false,
    dataPrimoAbbonamento:null,
    dataScadenza:null,
    assicurazione:false,
    certificato:false
  },
  image:""
}
  constructor(public route:ActivatedRoute, public usercommunication:UserService) { }

  ngOnInit() {this.start();
  }

  start(){
    const uid =this.route.snapshot.queryParamMap.get('uid');
   
    this.usercommunication.getUserbyId(uid).subscribe(res =>{
      this.user = res;
      if(this.user.abbonamento.dataPrimoAbbonamento!=null)
      {this.startDate=this.user.abbonamento.dataPrimoAbbonamento.toDate();
       
        
     
        
      }
      if(this.user.abbonamento.dataScadenza!=null)
      {this.endDate=this.user.abbonamento.dataScadenza.toDate();
        
      }
     });
    }
   /* if(uid!=null){
      this.uid=uid;
     // window.alert(uid);
    }
  }*/

}
