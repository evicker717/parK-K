import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotsPage } from './lots.page';

const routes: Routes = [
  {
    path: '',
    component: LotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotsPageRoutingModule {}
