import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupVerifiedPage } from './signup-verified.page';

const routes: Routes = [
  {
    path: '',
    component: SignupVerifiedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupVerifiedPageRoutingModule {}
