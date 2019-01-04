import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

import { User, DatiUtente } from '../../providers';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Events } from 'ionic-angular';

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
    private barcodeScanner: BarcodeScanner,
    public events: Events ) {

      this.mieidati=this.user.getinfo();
      //console.log(this.mieidati);

      if (this.mieidati.URLimg != "nopicture.gif") {
        this.myimg = "https://www.roma-by-night.it/Castello/assets/" + this.mieidati.URLimg;
      }

      this.events.subscribe('obj:scanned', (user) => {
        this.user.getusr()
        .subscribe( (res) => {
          //console.log(res);
          this.mieidati.Sanita=res.Sanita;
          this.mieidati.Miti=res.Miti;
          //console.log('After Scanned by ', user);
          //console.log(this.mieidati);
        });

      });
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
      this.navCtrl.push('OggettoPage', { "parentPage": this });

    }, (err) => {
        // An error occurred
    });

    /*  TEST
    this.oggetto='936382937264';
    this.navCtrl.push('OggettoPage', { "parentPage": this });
    */
  }

}
