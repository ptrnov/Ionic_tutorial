import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nilaiStr : string;
  public nilaiAry0 : any;
  public nilaiAry1 : any;

  constructor(public navCtrl: NavController) {
    //this.masukanNilai('1234a');
    

    const phi = 3.14;
    // phi = 3.147; //error read only or Assignment to constant variable

    console.log('constanta='+ phi);

    //ES6 const = contoh 1
    const func1 = function(a, b) {
      return a + b;
    };
    console.log('contoh 1 ='+func1(3, 3)); //6

    //ES6 const = contoh 2
    const func2 = (a, b) => { return a + b;};
    console.log('contoh 2 ='+ func2(3, 3)); //6

    //ES6 const = contoh 3
    const func3 = (a, b) => a + b;
    console.log('contoh 3 ='+func3(3, 3)); //6

    //ES6 const = contoh 4
    const func4 = (dobel) => dobel + dobel;
    console.log('contoh 4 ='+ func4(5)); //10

    //ES6 const = contoh 5
    const func5 = dobel => dobel + dobel;
    console.log('contoh 5 ='+ func5(5)); //10

    //ES6 const = contoh 6
    const numbers = [1, 2, 3, 4, 5];
    const kalidua1 = numbers.map(function(number) {
      return 2 * number;
    });
    console.log('contoh 6 ='+ kalidua1); //[ 2, 4, 6, 8, 10 ]

    //ES6 const = contoh 7
    const kalidua2 = numbers.map(number => 2 * number);
    console.log('contoh 7 ='+ kalidua2); //[ 2, 4, 6, 8, 10 ]

    //ES6 block scope var = contoh 8
    for (var i = 0; i < 5; i++) {
        console.log('contoh 8 - function scope Var=' +i) // 0 1 2 3 4
    }
    console.log('contoh 8 - outside function scope=' +i) // 5
    
    //ES6 block scope var = contoh 9
    function looping() {
      for (var h = 0; h < 5; h++) {
        console.log('contoh 9 - function scope=' +h); // 0 1 2 3 4
      }
    }
    looping();
   // console.log('contoh 9 - outside function scope=' +h); // ReferenceError: h is not defined
    
    //ES6 block scope let = contoh 10
    for (let k = 0; k < 5; k++) {
      console.log('contoh 10 - outside function scope=' +k); // 0 1 2 3 4
    }
    //console.log('contoh 10 - outside function scope=' + k); // ReferenceError: k is not defined
  
  
  }

  
  ionViewDidLoad() {
    let aryListNumber : any = [1, 2, 3];
    let aryListStr : any = ['1','asd' ,'3'];
    // this.masukanNilai('1234a1');
    
    this.fungsike0('Haloo');
    this.fungsike1(aryListNumber);
    this.fungsike2(aryListStr);
    
  }  

  fungsike0(nl : any){
    this.nilaiStr=nl;
    console.log(nl);
  }

  fungsike1(nl0) {
    this.nilaiAry0=nl0;
  }
  
  fungsike2(nl1) {
    this.nilaiAry1=nl1;
  }


}
