import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreazioneSchedaPage } from './creazione-scheda.page';

const routes: Routes = [
  {
    path: '',
    component: CreazioneSchedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreazioneSchedaPageRoutingModule {}
