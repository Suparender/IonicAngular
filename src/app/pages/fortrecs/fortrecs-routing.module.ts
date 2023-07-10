import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FortrecsPage } from './fortrecs.page';

const routes: Routes = [
  {
    path: '',
    component: FortrecsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FortrecsPageRoutingModule {}
