import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
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

  todo   : FormGroup;

  constructor(
      public navCtrl: NavController, 
      public viewCtrl : ViewController, 
      public navParams: NavParams,
      private formBuilder : FormBuilder,
      private database: DatabaseProvider//,
      //private ValidatorFn: Validators
  ){
    this.todo  = this.formBuilder.group({
      usr: ['',[Validators.required,]],
      psw: ['',[
                  Validators.required,
                  Validators.minLength(10),
                 // Validators.pattern('^[0-9]+$'), //numerik,
                 ,this.equalto()
                ]
            ]
      // psw: [' ',Validators.compose([
      //             Validators.required,Validators.minLength[10]
      //           ])
      //      ]
    });
  }

  equalto(): ValidatorFn {
    return (control: AbstractControl) => {
        let input = control.value;
        console.log(input);
        if (input=='percobaan1'){
          console.log('duplicate');
          return {'equalTo': true};
        }else{
          console.log('not duplicate');
          return {'equalTo': null};
        }
            
    };
  }
  // validateUnique(fildNm:string){
  //   return (group: FormGroup) => {
  //     let passwordInput = group.controls[fildNm];
  //     if (passwordInput.value =='ok'){
  //         return true;
  //     }else{
  //         return false;
  //     }
  //   }
    // return new Promise((resolve) => { 
    //   if(fildNm =='ok'){
    //     resolve(true);
    //   }else{
    //     resolve(false);
    //   }
    // });
  //}

  tambahUser(data){    
    let qry="INSERT INTO piter (usr,psw)  VALUES (?,?)";
    this.database.insertData(qry,[data['usr'],data['psw']]).then((msq)=>{
      //alert('message' + msq);
      console.log(msq);
    });        
  }

  // saveDetails(data){
  //   console.log(data);
  //   this.database.adduser(data['usr'],data['psw']);
  // }

  closeModal(){
    this.viewCtrl.dismiss();
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
  }

}
