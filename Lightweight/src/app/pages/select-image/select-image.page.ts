import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { Route } from '@angular/router';


import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.page.html',
  styleUrls: ['./select-image.page.scss'],
})
export class SelectImagePage implements OnInit {

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

  //public send:string|null|undefined ="";

  
  items = [
    {id: 0, value: "assets/Cena.png"},
    {id: 1, value: "assets/TheRock.png"},
    {id: 2, value: "assets/Ronnie.png"},
    {id: 3, value: "assets/Cena.png"},
    {id: 4, value: "assets/TheRock.png"},
    {id: 5, value: "assets/Ronnie.png"},
    {id: 6, value: "assets/Cena.png"},
    {id: 7, value: "assets/TheRock.png"},
    {id: 8, value: "assets/Ronnie.png"},
    {id: 9, value: "assets/Cena.png"},
    {id: 10, value: "assets/TheRock.png"},
    {id: 11, value: "assets/Ronnie.png"},
    {id: 12, value: "assets/Cena.png"},
    {id: 13, value: "assets/TheRock.png"},
    {id: 14, value: "assets/Ronnie.png"},
    {id: 15, value: "assets/Cena.png"},
    {id: 16, value: "assets/TheRock.png"},
    {id: 17, value: "assets/Ronnie.png"},
    {id: 18, value: "assets/Cena.png"},
    {id: 19, value: "assets/TheRock.png"},
    {id: 20, value: "assets/Ronnie.png"},
    {id: 21, value: "assets/Cena.png"},
    {id: 22, value: "assets/TheRock.png"},
    {id: 23, value: "assets/Ronnie.png"},
  ]
  constructor(private router:Router,public communicationService:UserService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.initUser();
  }
  trackItems(index: number, itemObject:any){
    return itemObject.id;
  }
  selected(item:string):void {
    this.user.image=item;
    this.communicationService.updateUser(this.user);
    this.router.navigate(['/tabs/home']);

  // window.alert(item)
   
    
    /*this.send =document.querySelector('#avatar')?.getAttribute('src');
    //window.alert(this.send);
    const params : NavigationExtras = {
      queryParams: {
        avatar:this.send
      }
      */
 // };
  
  //this.router.navigate(['/profile'],params);
  }
  initUser() {
    const uid =this.route.snapshot.queryParamMap.get('uid');
    this.communicationService.getUserbyId(uid).subscribe(res =>{
    this.user = res;
    
    
   });
  

}
}
