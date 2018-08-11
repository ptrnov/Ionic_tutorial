import { Component } from '@angular/core';

//--First Step template --
import { NavController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';

//--Second Step template --
//import { NavController, App } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
//import { DatabaseProvider } from '../../providers/database/database';


@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    //public app: App,
    //public database : DatabaseProvider
    private database: DatabaseProvider
  ) {

  }

  //--First Step template --
  logout(){
   this.navCtrl.push(WelcomePage);
  }

  //--Second Step template --
  //  logout(){
  //     const root = this.app.getRootNav();
  //     root.popToRoot();
  //  };
  Insert(){
    this.database.InsertInvoice();
  }

  public invoice(){
    return this.database.invoices;
  }
  // CreateUser(){
  //   this.database.CreateUser(123,"piter","novian").then((data)=>{
  //     console.log(data);
  //   },(error)=>{
  //     console.log(error);
  //   });
  // };

  // GetAllUser(){
  //   this.database.GetAllUsers().then((data)=>{
  //     console.log(data);
  //   },(error)=>{
  //     console.log(error);
  //   })
  // }


  

}
