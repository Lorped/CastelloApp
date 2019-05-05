import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers';

import { Http } from '@angular/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Events } from 'ionic-angular';

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

  userid = 0;

  constructor(public navCtrl: NavController,
    public user: User, public push: Push, private http: Http, public events: Events) {

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

      this.userid=this.user.getinfo().IDutente;
      this.pushsetup( this.userid );

      this.navCtrl.push('TabsPage');
    }, (err) => {
      alert("Non autorizzato");
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  pushsetup( user: number ) {

		const options: PushOptions = {
			android: {
				senderID: '639056394320',
				//sound: true,
				forceShow: true,
				icon: 'notification',
        iconColor: '#ff0000'
			},
			ios: {
				alert: true,
				badge: true,
				sound: true
			},
			windows: {}
		};

    //console.log(userid);

		const pushObject: PushObject = this.push.init(options);



		pushObject.on('registration').subscribe((registration: any) => {
			//console.log('Device registered ', registration.registrationId);
			//alert('Device registered '+registration.registrationId);

			let updateurl = 'https://www.roma-by-night.it/Castello/wsPHPapp/updateid.php?userid=' + user +'&id='+registration.registrationId;
			this.http.get(updateurl)
			.subscribe(res =>  {
					// updated
					//alert('Device registered '+registration.registrationId);
			});

			/*
      let topic = "userid" + this.currentUser['userid'];
			pushObject.subscribe(topic).then((res:any) => {
				//console.log("subscribed to topic: ", res);
				//alert("subscribed to topic: " + res);
			});
      */

		});

    pushObject.on('notification').subscribe((notification: any) => {

      //console.log("any notification");
      this.events.publish('obj:scanned', 'Dorefresh');
      //console.log(notification.additionalData.foreground);
      //console.log(notification.additionalData);

		});

		pushObject.on('error').subscribe(error => alert('Error with Push plugin ' + error));
	}


}
