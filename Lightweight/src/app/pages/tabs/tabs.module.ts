import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


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
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
