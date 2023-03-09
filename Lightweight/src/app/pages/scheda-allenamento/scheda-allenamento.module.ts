import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedaAllenamentoPageRoutingModule } from './scheda-allenamento-routing.module';

import { SchedaAllenamentoPage } from './scheda-allenamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedaAllenamentoPageRoutingModule
  ],
  declarations: [SchedaAllenamentoPage]
})
export class SchedaAllenamentoPageModule {}
