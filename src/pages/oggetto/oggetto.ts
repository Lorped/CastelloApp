import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Events } from 'ionic-angular';


/**
 * Generated class for the OggettoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oggetto',
  templateUrl: 'oggetto.html',
})
export class OggettoPage {

  barcode: '';
  IDutente: 0;
  IDprofessione: 0;


	nome = '';
	descrizione = '';
  deltasan = 0 ;
  deltamiti = 0 ;
  deltapf = 0 ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient, public events: Events ) {

    this.barcode = this.navParams.get("parentPage").oggetto;
		this.IDutente = this.navParams.get("parentPage").mieidati['IDutente'];
    this.IDprofessione = this.navParams.get("parentPage").mieidati['IDprofessione'];

    var url = 'https://www.roma-by-night.it/Castello/wsPHPapp/scanoggetti.php';


    this.http.get(url+ '?IDutente=' + this.IDutente + '&IDprofessione=' + this.IDprofessione + '&scan=' + this.barcode)
    .subscribe( (data: any) => {
      this.nome=data.nome;
      this.descrizione=data.descrizione;
      this.deltasan=data.deltasan;
      this.deltamiti=data.deltamiti;
      this.deltapf=data.deltapf;
      //console.log(data);

      this.events.publish('obj:scanned', this.IDutente);
    });


  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OggettoPage');
  }

}
