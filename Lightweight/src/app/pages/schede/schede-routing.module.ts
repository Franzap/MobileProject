import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedePage } from './schede.page';

const routes: Routes = [
  {
    path: '',
    component: SchedePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedePageRoutingModule {}
