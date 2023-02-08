import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route } from '@angular/router';
import { Router ,ActivatedRoute} from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public newUsername:any="";

  public user:User = {
    uid:"",
    email:"",
    displayName:"",
    abbonamento :{
      descrizione:"",
      stato:false
    },
    image:"assets/user.png"
  }
  
  constructor( private router:Router, private route:ActivatedRoute, public usercommunication:UserService) { }

  ngOnInit() {
    this.initUser();
    
  }

  initUser() {
    const uid =this.route.snapshot.queryParamMap.get('uid');
    this.usercommunication.getUserbyId(uid).subscribe(res =>{
    this.user = res;
    
    
   });
   //this.imageSelected();
  }

  save() {

    if(this.newUsername!="")
    {this.user.displayName=this.newUsername;}
   
    this.usercommunication.updateUser(this.user);
    this.router.navigate(['/tabs/home']);

  }
  navigateToSelection(){
    const params : NavigationExtras = {
      queryParams: {
          uid:this.user.uid
      }
  };
  this.router.navigate(['/select-image'],params);
    
  }
   /*imageSelected(){
    
    const avatar =this.route.snapshot.queryParamMap.get('avatar');
    if(avatar!=null && avatar!=undefined)
   {
    this.user.image=avatar;
    window.alert(avatar);
   }
   
  }
  */
  
}
