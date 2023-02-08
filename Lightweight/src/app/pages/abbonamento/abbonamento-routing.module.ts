import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbbonamentoPage } from './abbonamento.page';

const routes: Routes = [
  {
    path: '',
    component: AbbonamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbbonamentoPageRoutingModule {}
