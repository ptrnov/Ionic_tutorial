import { Component } from '@angular/core';

//--First Step template --
//import { NavController } from 'ionic-angular';
//import { WelcomePage } from '../welcome/welcome';

//--Second Step template --
import { NavController, App } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public app: App) {

  }

  //--First Step template --
  //logout(){
  //  this.navCtrl.push(WelcomePage);
  //}

  //--Second Step template --
   logout(){
      const root = this.app.getRootNav();
      root.popToRoot();
   }
}
