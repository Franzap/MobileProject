import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbbonamentoPageRoutingModule } from './abbonamento-routing.module';

import { AbbonamentoPage } from './abbonamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbbonamentoPageRoutingModule
  ],
  declarations: [AbbonamentoPage]
})
export class AbbonamentoPageModule {}
