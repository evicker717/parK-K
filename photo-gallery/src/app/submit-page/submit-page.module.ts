import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitPagePageRoutingModule } from './submit-page-routing.module';

import { SubmitPagePage } from './submit-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitPagePageRoutingModule
  ],
  declarations: [SubmitPagePage]
})
export class SubmitPagePageModule {}
