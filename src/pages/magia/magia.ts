import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Events } from 'ionic-angular';

/**
 * Generated class for the MagiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-magia',
  templateUrl: 'magia.html',
})
export class MagiaPage {

  barcode: '';
  IDutente: 0;

	nome = '';
	descrizione = '';
  deltasan = 0 ;
  deltamiti = 0 ;
  deltapf = 0 ;
  minmiti = 0 ;
  mitiPG = 0 ;

  outputnome = '?????';
  outputdescrizione = '?????';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient, public events: Events ) {

    this.barcode = this.navParams.get("parentPage").oggetto;
		this.IDutente = this.navParams.get("parentPage").mieidati['IDutente'];


    var url = 'https://www.roma-by-night.it/Castello/wsPHPapp/scanmagia.php';


    this.http.get(url+ '?IDutente=' + this.IDutente +  '&scan=' + this.barcode)
    .subscribe( (data: any) => {
      this.nome=data.nome;
      this.descrizione=data.descrizione;
      this.deltasan=data.deltasan;
      this.deltamiti=data.deltamiti;
      this.deltapf=data.deltapf;
      this.minmiti=data.minmiti;
      this.mitiPG=data.mitiPG;
      console.log(data);


      //this.events.publish('obj:scanned', this.IDutente);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MagiaPage');
  }

}
