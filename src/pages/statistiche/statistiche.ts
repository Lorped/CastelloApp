import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

import { User, DatiUtente } from '../../providers';

import { Events } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the StatistichePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistiche',
  templateUrl: 'statistiche.html',
})
export class StatistichePage {

  mieidati: DatiUtente;
  oggetto = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public user: User,
    public events: Events,
    private app: App,
    private barcodeScanner: BarcodeScanner ) {

    this.user.getusr()
    .subscribe( (res: any) => {
      //console.log(res);
      this.mieidati.Sanita=res.Sanita;
      this.mieidati.Miti=res.Miti;
      this.mieidati.PF=res.PF;
      //console.log(this.mieidati);
    });

    this.mieidati=this.user.getinfo();
    //console.log(this.mieidati);

    this.events.subscribe('obj:scanned', (data) => {
      //console.log(data);
      this.user.getusr()
      .subscribe( (res: any) => {
        //console.log(res);
        this.mieidati.Sanita=res.Sanita;
        this.mieidati.Miti=res.Miti;
        this.mieidati.PF=res.PF;
        //console.log('After Scanned by ', user);
        //console.log(this.mieidati);
      });

    });

  }

  doRefresh(refresher) {
    this.user.getusr()
    .subscribe( (res: any) => {
      this.mieidati.Sanita=res.Sanita;
      this.mieidati.Miti=res.Miti;
      this.mieidati.PF=res.PF;
    });
    refresher.complete();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad StatistichePage');
  }

  openbarcode() {

    this.barcodeScanner.scan( {"showTorchButton": true} ).then((barcodeData) => {
      // Success! Barcode data is here
      //console.log(barcodeData.text);

      this.oggetto=barcodeData.text;

      if (this.oggetto.substr(0,1) == 'M') {
        let nav = this.app.getRootNav();
        nav.push('MagiaPage', { "parentPage": this });
        //this.navCtrl.push('MagiaPage', { "parentPage": this });
      } else {
        let nav = this.app.getRootNav();
        nav.push('OggettoPage', { "parentPage": this });
        //this.navCtrl.push('OggettoPage', { "parentPage": this });
      }


    }, (err) => {
        // An error occurred
    });

    /*  TEST
    this.oggetto='936382937264';
    //this.oggetto='M467000272497';

    if (this.oggetto.substr(0,1) == 'M') {
      let nav = this.app.getRootNav();
      nav.push('MagiaPage', { "parentPage": this });
      //this.navCtrl.push('MagiaPage', { "parentPage": this });
    } else {
      let nav = this.app.getRootNav();
      nav.push('OggettoPage', { "parentPage": this });
      //this.navCtrl.push('OggettoPage', { "parentPage": this });
    }
    */
  }

}
