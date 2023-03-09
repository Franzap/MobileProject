import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedePageRoutingModule } from './schede-routing.module';

import { SchedePage } from './schede.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedePageRoutingModule
  ],
  declarations: [SchedePage]
})
export class SchedePageModule {}
