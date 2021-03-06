import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User,  ScanObj, ScanPair, ScanList} from '../../providers';

import { Events } from 'ionic-angular';

/**
 * Generated class for the OggettiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oggetti',
  templateUrl: 'oggetti.html',
})
export class OggettiPage {

  listscanobj: Array<ScanObj> = [];
  listscanpair: Array<ScanPair> = [];

  lista: ScanList;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private user: User, private events: Events) {

      this.refreshscanlist();

      this.events.subscribe('obj:scanned', (user) => {
        this.refreshscanlist();
        //console.log('Scanned by ', user);
      });

      /*
      this.user.getscanlist()
      .subscribe ((res: any) => {
        //console.log(res);
        this.listscanobj=res.scan;
        this.listscanpair=res.pair;
      });
      */


      //this.listscanobj=this.lista.scan;
      //this.listscanpair=this.lista.pair;

      //console.log(this.listscanobj);
      //console.log(this.listscanpair);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OggettiPage');
  }

  refreshscanlist() {
    this.user.getscanlist()
    .subscribe ((res: any) => {
      //console.log(res);
      this.listscanobj=res.scan;
      this.listscanpair=res.pair;
    });
  }

}
