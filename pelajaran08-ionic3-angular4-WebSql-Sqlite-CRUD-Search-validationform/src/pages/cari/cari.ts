import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the CariPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cari',
  templateUrl: 'cari.html',
})
export class CariPage {

  private ListUser: any;
  //private items: string[];
  private items: any;
  searchQuery: string = '';

  constructor(  
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database : DatabaseProvider,
    
  ) {
    this.initializeItems('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CariPage');
    // this.database.selectData().then((data)=>{
    //   console.log(data);
    //   this.ListUser= data;
    //  });
    // this.database.selectData().then((data)=>{
    //   console.log(data);
    //   //let x1=JSON.stringify(data);
    //   this.items=data;
    // });
  }

  tutup() {
      //console.log('asda');
      this.navCtrl.popToRoot();
  }

  initializeItems(val : string){
    console.log(val);
    var param =val!=''?val:'';
    //if (val) {
      this.database.selectData(param).then((data)=>{
        console.log(data);
        this.items=data;             
      });
    // }else{
    //   this.database.selectData('').then((data)=>{
    //     console.log(data);
    //     this.items=data;             
    //   });
    // }

    // this.database.selectData(ev).then((data)=>{
    //     console.log(data);
    //     this.items=data;             
    // });

    
    // this.items = [
    //   'Amsterdam',
    //   'Amsb',
    //   'Bogota'
    // ];
  }


  getItems(ev: any) {
    const val = ev.target.value!=''?ev.target.value:'';
   
    // Reset items back to all of the items
    
    this.initializeItems(val);
   // var aryTmp=[];
    // this.database.selectData().then((data)=>{
    //   //console.log(data);
    //   //let x1=JSON.stringify(data);
    //  // aryTmp.push(data);
    //   this.items=data;
      
    // });
    //this.items=aryTmp;
    // set val to the value of the searchbar
    //const val = ev.target.value;

    //console.log(val.toLowerCase());
    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item: any) => {
    //     return (item.usr.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   });
    //   // return this.items.filter(item => item.id.toLowerCase().includes(val) ||
    //   //     item.usr.toLowerCase().includes(val)
    //   // )
    // }else{
    //   //this.initializeItems();

    //   //return this.items.filter(item => item.usr.includes(val.toLowerCase()));

    //   //  return this.items.filter((item) => {
    //   //     //if (item.usr.contains(val.toLowerCase()) >= 0) {
    //   //     if (item.usr.indexOf(val.toLowerCase()) >= 0) {
    //   //       return true;
    //   //     }
    //   //     return false;
    //   //   });
    // }
  }

}
