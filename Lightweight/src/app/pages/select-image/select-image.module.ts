import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectImagePageRoutingModule } from './select-image-routing.module';

import { SelectImagePage } from './select-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectImagePageRoutingModule
  ],
  declarations: [SelectImagePage]
})
export class SelectImagePageModule {}
