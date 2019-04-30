import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

import { User, DatiUtente } from '../../providers';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  mieidati: DatiUtente;

  myimg = 'assets/imgs/nopicture.gif' ;

  oggetto = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    public user: User,
    private barcodeScanner: BarcodeScanner
     ) {

      this.mieidati=this.user.getinfo();
      //console.log(this.mieidati);

      if (this.mieidati.URLimg != "nopicture.gif") {
        this.myimg = "https://www.roma-by-night.it/Castello/assets/" + this.mieidati.URLimg;
      }


  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');
  }

  public logoutx() {
    //this.nav.setRoot('LoginPage');
    this.app.getRootNav().setRoot('LoginPage');
  }

  openbarcode() {

    this.barcodeScanner.scan( {"showTorchButton": true} ).then((barcodeData) => {
      // Success! Barcode data is here
      //console.log(barcodeData.text);

      this.oggetto=barcodeData.text;

      if (this.oggetto.substr(0,1) == 'M') {
        this.navCtrl.push('MagiaPage', { "parentPage": this });
      } else {
        this.navCtrl.push('OggettoPage', { "parentPage": this });
      }


    }, (err) => {
        // An error occurred
    });

    /*  TEST */
    //this.oggetto='936382937264';
    this.oggetto='M529417215427';

    if (this.oggetto.substr(0,1) == 'M') {
      let nav = this.app.getRootNav();
      nav.push('MagiaPage', { "parentPage": this });
      //this.navCtrl.push('MagiaPage', { "parentPage": this });
    } else {
      let nav = this.app.getRootNav();
      nav.push('OggettoPage', { "parentPage": this });
      //this.navCtrl.push('OggettoPage', { "parentPage": this });
    }

  }

}
