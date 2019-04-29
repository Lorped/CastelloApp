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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient, public events: Events ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MagiaPage');
  }

}
