import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OggettiPage } from './oggetti';

@NgModule({
  declarations: [
    OggettiPage,
  ],
  imports: [
    IonicPageModule.forChild(OggettiPage),
  ],
})
export class OggettiPageModule {}
