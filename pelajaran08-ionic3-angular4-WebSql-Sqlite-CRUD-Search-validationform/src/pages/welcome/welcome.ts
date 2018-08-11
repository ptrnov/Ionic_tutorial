import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private database : DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage setup table');  
    let qry="CREATE TABLE IF NOT EXISTS piter (id INTEGER NULL PRIMARY KEY AUTOINCREMENT, usr TEXT UNIQUE, psw TEXT)"
    this.database.createTable(qry,[]);    
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }
}
