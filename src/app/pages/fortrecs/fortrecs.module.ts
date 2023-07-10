import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FortrecsPageRoutingModule } from './fortrecs-routing.module';

import { FortrecsPage } from './fortrecs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FortrecsPageRoutingModule
  ],
  declarations: [FortrecsPage]
})
export class FortrecsPageModule {}
