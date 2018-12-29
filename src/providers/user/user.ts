import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
 export class DatiUtente {
   public IDutente: number;
   public NomePG: string;
   public CognomePG: string;
   public IDprofessione: number;
   public DescProfessione: string;
   public nomeprofessione: string;  //from LEFT JOIN
   public Miti: number;
   public Sanita: number;
   public URLimg: string;
   constructor () {
     this.IDutente = 0;
     this.NomePG = '' ;
     this.CognomePG = '';
     this.IDprofessione = 0;
     this.DescProfessione =  '';
     this.Miti = 0;
     this.Sanita = 0;
     this.URLimg = '';
   }
 }

 export class ScanObj {
   public IDutente: number;
   public IDoggetto: number;
   public data: string;
   public nome: string;
   public descrizione: string;
   public DescEstesa: string;

   constructor () {
     this.IDutente = 0;
     this.IDoggetto = 0 ;
     this.data = '';
     this.nome = '';
     this.descrizione =  '';
     this.DescEstesa = '';
   }
 }

 export class ScanPair {
   public nome1: string;
   public nome2: string;
   public data: string;
   public PD: string;

   constructor () {
     this.nome1 = '';
     this.nome1 = '' ;
     this.data = '';
     this.PD = '';
   }
 }

 export class ScanList  {
   public scan: Array<ScanList> = [];
   public pair: Array<ScanPair> = [];
 }

@Injectable()
export class User {
  _user: any;
  url: string = 'https://www.roma-by-night.it/Castello/wsPHPapp/';

  constructor(public http: HttpClient) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.http.post( this.url + 'login.php', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
        console.error('ERROR');
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getinfo() {
    return this._user;
  }

  getscanlist() {
    return this.http.get(this.url + 'getscanlist.php?id='+this._user.IDutente);

  }


  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
    //console.log(this._user);
  }
}
