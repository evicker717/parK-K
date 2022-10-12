import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotsPageRoutingModule } from './lots-routing.module';

import { LotsPage } from './lots.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LotsPageRoutingModule
  ],
  declarations: [LotsPage]
})
export class LotsPageModule {}
