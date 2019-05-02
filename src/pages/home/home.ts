import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

import { User, DatiUtente } from '../../providers';




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

  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    public user: User
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


}
