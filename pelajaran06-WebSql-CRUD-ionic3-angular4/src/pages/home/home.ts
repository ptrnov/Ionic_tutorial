import { Component } from '@angular/core';

//--First Step template --
import { NavController,ModalController  } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { AdduserPage } from '../adduser/adduser';
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
  private ListUser: any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
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
    this.database.ins_TBL1();
  }

  ionViewDidLoad() {
    this.database.select_TBL().then((data)=>{
      //console.log(data);
      this.ListUser= data;
     });
  }
  invoice(){
     //var rslt:Array<Object>= this.database.ListUser;
     //return 123;
    //  console.log(this.database.select_TBL());
     this.database.select_TBL().then((data)=>{
      //console.log(data);
      this.ListUser= data;
     });
     
     //return this.database.select_TBL();
  }

  public openModaladdUser(){
    var data = { message : 'hello world' };
    var ModalAdduser = this.modalCtrl.create(AdduserPage,data);
    ModalAdduser.onDidDismiss(() => {
      this.ionViewDidLoad();
    });
    ModalAdduser.present();
  }

  addAc
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
