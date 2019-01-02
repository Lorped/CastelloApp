import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  saveme= {
    checked: false
  };


  constructor(public navCtrl: NavController, public user: User) {

    this.account.email=window.localStorage.getItem( "castellouserid" );
    this.account.password=window.localStorage.getItem( "castellopassword" );
    if (this.account.email != '' )  { this.saveme.checked = true; }

  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {

      if ( this.saveme.checked == true ) {
				window.localStorage.setItem( "castellouserid" , this.account.email );
				window.localStorage.setItem( "castellopassword" , this.account.password );
			} else {
				window.localStorage.removeItem( "castellouserid" );
				window.localStorage.removeItem( "castellopassword" );
			}




      this.navCtrl.push('TabsPage');
    }, (err) => {
      alert("Non autorizzato");
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

}
