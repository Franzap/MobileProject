import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedaAllenamentoPage } from './scheda-allenamento.page';

const routes: Routes = [
  {
    path: '',
    component: SchedaAllenamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedaAllenamentoPageRoutingModule {}
