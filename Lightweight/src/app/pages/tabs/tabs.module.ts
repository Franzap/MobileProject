import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'abbonamento',
        children:[
          {
            path: '',
            loadChildren: () => import('../abbonamento/abbonamento.module').then( m => m.AbbonamentoPageModule)
          }
        ]
      },

      {
        path: 'home',
        children:[
          {
            path:'',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },

      {
        path: 'prenotazioni',
        children:[
          {
            path: '',
            loadChildren: () => import('../prenotazioni/prenotazioni.module').then( m => m.PrenotazioniPageModule)
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
