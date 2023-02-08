import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TranslateModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
