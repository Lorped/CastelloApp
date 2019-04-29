import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User, DatiUtente } from '../../providers';

import { Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public user: User,
    public events: Events ) {

    this.mieidati=this.user.getinfo();
    console.log(this.mieidati);

    this.events.subscribe('obj:scanned', (user) => {
      this.user.getusr()
      .subscribe( (res: any) => {
        //console.log(res);
        this.mieidati.Sanita=res.Sanita;
        this.mieidati.Miti=res.Miti;
        console.log('After Scanned by ', user);
        //console.log(this.mieidati);
      });

    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatistichePage');
  }

}
