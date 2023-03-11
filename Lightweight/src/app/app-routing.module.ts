import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, ROUTES, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from './services/autenticazione.service';




const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
    
  },
  {
    path: 'abbonamento',
    loadChildren: () => import('./pages/abbonamento/abbonamento.module').then( m => m.AbbonamentoPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'prenotazioni',
    loadChildren: () => import('./pages/prenotazioni/prenotazioni.module').then( m => m.PrenotazioniPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signup-verified',
    loadChildren: () => import('./pages/signup-verified/signup-verified.module').then( m => m.SignupVerifiedPageModule)
  },
  {
    path: 'select-image',
    loadChildren: () => import('./pages/select-image/select-image.module').then( m => m.SelectImagePageModule)
  },
  {
    path: 'creazione-scheda',
    loadChildren: () => import('./pages/creazione-scheda/creazione-scheda.module').then( m => m.CreazioneSchedaPageModule)
  },
  {
    path: 'open-scheda',
    loadChildren: () => import('./pages/open-scheda/open-scheda.module').then( m => m.OpenSchedaPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./pages/policy/policy.module').then( m => m.PolicyPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TranslateModule.forRoot()
  ],
  exports: [RouterModule]/*,
  providers :[
    {
      provide: ROUTES,
      useFactory:()=>{

        let otherRoutes: Routes = [];
        var auth:AuthenticationService;
        var temp = "";
        var a = JSON.parse(localStorage.getItem('user') || '{}') ;
        if(a.uid !=null){
 
         temp = a.uid;
        }
        if(temp == ""){
          otherRoutes.push({
            path:'',
            redirectTo: 'login' ,
            pathMatch: 'full'
          });
        }else{
          otherRoutes.push({
            path:'',
            redirectTo: 'login' ,
            pathMatch: 'full'
          });
        }
        return [
       ...otherRoutes,
       ...routes
        
        ];
 },
        multi : true
      }
    
  ]*/
})


export class AppRoutingModule { }

