import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  xlancia = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, public events: Events ) {

    this.barcode = this.navParams.get("parentPage").oggetto;
		this.IDutente = this.navParams.get("parentPage").mieidati['IDutente'];


    var url = 'https://www.roma-by-night.it/Castello/wsPHPapp/scanmagia.php';


    this.http.get(url+ '?IDutente=' + this.IDutente +  '&scan=' + this.barcode)
    .map(res => res.json())
    .subscribe( (data: any) => {
      this.nome=data.nome;
      this.descrizione=data.descrizione;
      this.deltasan=data.deltasan;
      this.deltamiti=data.deltamiti;
      this.deltapf=data.deltapf;
      this.minmiti=data.minmiti;
      this.mitiPG=data.mitiPG;
      console.log(data);

console.log (this.minmiti + " vs." + this.mitiPG);
      if (this.minmiti <= this.mitiPG) {
        this.outputnome = this.nome;
        this.outputdescrizione = this.descrizione;
      }

      //this.events.publish('obj:scanned', this.IDutente);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MagiaPage');
  }

  goback() {
    this.navCtrl.pop();
  }

  lancia() {

    this.outputnome = this.nome;
    this.outputdescrizione = this.descrizione;

    var url = 'https://www.roma-by-night.it/Castello/wsPHPapp/usamagia.php';
    this.http.get(url+ '?IDutente=' + this.IDutente +  '&scan=' + this.barcode)
    .map(res => res.json())
    .subscribe( (data: any) => {
      this.xlancia = false ;
      this.events.publish('obj:scanned', this.IDutente);
    });

  }
}
