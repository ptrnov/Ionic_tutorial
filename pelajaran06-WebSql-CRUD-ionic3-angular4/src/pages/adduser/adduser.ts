import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the AdduserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adduser',
  templateUrl: 'adduser.html',
})
export class AdduserPage {

  form   : FormGroup;

  constructor(
      public navCtrl: NavController, 
      public viewCtrl : ViewController, 
      public navParams: NavParams,
      private formBuilder : FormBuilder,
      private database: DatabaseProvider
      // private validator: Validators
  ){
    this.form  = this.formBuilder.group({
      usr: ['',Validators.required],
      psw: ['',Validators.minLength(10)]
    });
  }

  saveDetails(data){
    //console.log(data);
    this.database.adduser(data['usr'],data['psw']);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
  }

}
