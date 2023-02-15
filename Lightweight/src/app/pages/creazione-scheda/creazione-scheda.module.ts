import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreazioneSchedaPageRoutingModule } from './creazione-scheda-routing.module';

import { CreazioneSchedaPage } from './creazione-scheda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreazioneSchedaPageRoutingModule
  ],
  declarations: [CreazioneSchedaPage]
})
export class CreazioneSchedaPageModule {}
