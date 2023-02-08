import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupVerifiedPageRoutingModule } from './signup-verified-routing.module';

import { SignupVerifiedPage } from './signup-verified.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupVerifiedPageRoutingModule
  ],
  declarations: [SignupVerifiedPage]
})
export class SignupVerifiedPageModule {}
