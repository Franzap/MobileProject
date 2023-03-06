import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenSchedaPage } from './open-scheda.page';

const routes: Routes = [
  {
    path: '',
    component: OpenSchedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenSchedaPageRoutingModule {}
