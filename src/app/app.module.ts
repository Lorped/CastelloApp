import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { User } from '../providers';
import { MyApp } from './app.component';

import { Push } from '@ionic-native/push';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';




@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    User,
    StatusBar,
    SplashScreen,
    Push,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
