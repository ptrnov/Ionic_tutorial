import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { isArray } from 'ionic-angular/umd/util/util';
//import { isArray, isObject } from 'ionic-angular/umd/util/util';
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
  private clmFind=[]; //Promise<any>;
  private cnt: Promise<any>

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
                 ,this.equalto(),
                ]
            ]
      // psw: [' ',Validators.compose([
      //             Validators.required,Validators.minLength[10]
      //           ])
      //      ]
    });
  }

  //  testa(query,key,find){
  //     var querySql ="SELECT id,usr,psw FROM piter where psw='" + find + "'";
  //     //var querySql ="SELECT id,usr,psw FROM piter where psw='12345678910'";
  //     this.database.matchData(querySql,[],'psw').then((data)=>{
  //         this.clmFind.push(data);
  //     })

  //     let sss: string;
  //     for (let k of Object.keys(this.clmFind)) {
  //       //console.log(this.clmFind[k][0]);
  //       sss=this.clmFind[k][0];
  //     }
      
  //     let isValid = find!=sss;
  //     //let isValid = '12345678910' != find;
  //     if (!isValid){
  //         return {'equalTo': {isValid}};
  //     }else{
  //         return null;
  //     }
  //  }

  equalto(): ValidatorFn{
      var rslt:string;
      var rsltAry=[];
      var input:any;
      return (control: AbstractControl)=>{
        input = control.value;  
            //var querySql ="SELECT id,usr,psw FROM piter where psw='"+input+"'";
            //var querySql ="SELECT id,usr,psw FROM piter where psw='12345678910'";
            var querySql ="SELECT psw FROM piter WHERE usr like '%" + input +"%' ORDER BY psw DESC";
            this.database.matchData(querySql,[],'psw').then((data)=>{
              rslt=data[0];      
              rsltAry.push(data);       
              // setTimeout(()=> {
              //   rslt=data[0];
              // }, 100);             
              //console.log(rslt);
              //console.log('R2=' + rslt);
              
            });
              rsltAry = rsltAry.filter((ary: any) => {
                //console.log(ary.psw.toLowerCase().indexOf(input.toLowerCase));
                  return (ary.psw.toLowerCase().indexOf(input.toLowerCase()) > -1);
                  //console.log(ary.psw.toLowerCase().indexOf(input) > -1);
              });
                
            console.log('R1=' + rslt);
            console.log('R2=' + rsltAry);
            //let isValid = '12345678910' != input;
            var isValid = rslt != input;
            if (!isValid){
              return {'equalTo': {isValid}};
              //rsltAry = [];
            }else{
              return null;
            }
      }     
      //     //console.log('db '+ data[0] + 'input' + input);
      //     if(data) { 
      //       output= {'equalTo': true};
      //     }else{
      //       output= null;
      //     } 
      //   return output;
    
      //let rslt='adsdas';  
      // for (let k of Object.keys(rslt)) {
      //       console.log(rslt[k]);
      //       //sss=this.clmFind[k][0];
      //     }
      
      
      // console.log('bitch2 '+ this.clmFind);
      // let isValid = '12345678910' != input;
      // if (!isValid){
      //   return {'equalTo': {isValid}};
      // }else{
      //   return null;
      // }
      // return {'equalTo': {isValid}};
      //return output;
    
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
      //console.log(msq);
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
