//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
// import { Sql } from "../database/Sql";
import { Platform } from 'ionic-angular';
  
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const DB_NAME: string = 'data.db';
const win: any = window;

@Injectable()
export class DatabaseProvider {
  private database: SQLiteObject;   //==database sqlite cordova
  private _db: any;                 //==database websql browser 
  
  constructor(
    public http: Http,
    public storage: SQLite,
    private platform: Platform    
  ) 
  {    
    /* Split platform SQLite or WebSql
    * SQLite   : Live Mobile Storage.
    * WebSql   : Develompen debug database,table,query.
    * Author   : ptr.nov@gmail.com
    */
    platform.ready().then(() => {
        console.warn('platform Insert Indentification');
        if (platform._platforms[0] == 'cordova') {
            console.warn('Storage: Sqlite cordova/Mobile Flatform1');
            this.storage = new SQLite;
            this.storage.create({ name: DB_NAME ,location:"default" }).then( ( db: SQLiteObject ) => {
                this.database = db;
                // db.executeSql("CREATE TABLE IF NOT EXISTS piter (id INTEGER NULL PRIMARY KEY AUTOINCREMENT, usr TEXT, psw TEXT)",{}).then(()=>{
                //   console.log("Create Table cordova Mobile");
                // }).catch(e => console.log(e)); 
            }).catch((error) => {
              console.log(error);        
            });
        } else {
           console.warn('Storage: WebSql Browser Flatform');        
           this._db = win.openDatabase(DB_NAME, '1.0', '', 5 * 1024 * 1024);
          // this.create_TBL();
        }   	
    });    
  }

   
  /* Pungsi Create Table untuk WebSql Browser & Sqlite Cordova
  * tabel    : adalah tabel yang sudah di create sebelumnya.
  * querySql : Sql Query Syntak
  * Author   : ptr.nov@gmail.com
  */
  public createTable(querySql: string,value:any){
    console.warn('Function Create Table');
    this.platform.ready().then(() => {     
      if (this.platform._platforms[0] == 'cordova') {
        return new Promise((resolve, reject)=>{
          console.log('Sqlite cordova/Mobile Flatform');
          /* inser sqlite query */
          return new Promise((resolve, reject)=>{
            let sql =querySql;
            this.database.executeSql(sql,value).then((data)=>{
                console.log('return=' + data);
                resolve(data);
            },(error)=>{
                console.log('return=' + error);
                reject(error);
            });
          });
        });
      }else{
        
        /* inser websql query */
        return new Promise((resolve, reject)=>{
          //console.log('WebSql Browser Flatform');
          console.log('WebSql Browser Flatform to Function Create Table');
          let sql = querySql;
          this._db.transaction(function (tx) {
            tx.executeSql(sql,[],function(tx,results ) {
              console.log('return=' +  results.rows.item);
              resolve(results);
            });
          });
        });
      }
    })
  }

  /* Pungsi Tambah Data untuk WebSql Browser & Sqlite Cordova
  * tabel    : adalah tabel yang sudah di create sebelumnya.
  * querySql : Sql Query Syntak
  * Author   : ptr.nov@gmail.com
  */
  public insertData(querySql: string,value:any){
    this.platform.ready().then(() => {
        console.log('platform Insert Indentification');
        if (this.platform._platforms[0] == 'cordova') {
          console.log('Sqlite cordova/Mobile Flatform');
          /* inser sqlite query */
          return new Promise((resolve, reject)=>{
            let sql =querySql;
            this.database.executeSql(sql,value).then((data)=>{
              console.log(data);
              resolve(data);                
            },(error)=>{
              console.log(error);
              reject(error);
            });
          });
        }else{
          console.log('WebSql Browser Flatform');
          let sql = querySql;
          this._db.transaction(function (tx) {
            tx.executeSql(sql,value);
          });
        }
    })
  }

  /* Pungsi Select Data untuk WebSql Browser & Sqlite Corddova
  * tabel    : adalah tabel yang sudah di create sebelumnya.
  * querySql : Sql Query Syntak
  * Author   : ptr.nov@gmail.com
  */
  public selectData(ev:string){  
    const cari = ev;
    console.log(cari);
    return new Promise((resolve) => {    
      this.platform.ready().then(() => {
        console.log('platform Select Indentification1');      
        if (this.platform._platforms[0] == 'cordova') {         
            console.log('Sqlite cordova/Mobile Flatform');
            if (cari) {
              console.log('select search');
              var qrySelect ="SELECT id, usr FROM piter WHERE usr like '%" + cari +"%' ORDER BY id DESC";
            }else{
              console.log('select default');
              var qrySelect ="SELECT id, usr FROM piter ORDER BY id DESC";
            };
            this.database.executeSql(qrySelect,[]).then((results2) => {
              var aryRslt2=[];
              if(results2.rows.length > 0) {                
                for(let inc2 = 0; inc2 < results2.rows.length; inc2++) {
                      aryRslt2.push({
                          id: results2.rows.item(inc2).id,
                          usr: results2.rows.item(inc2).usr
                      });                    
                }                            
              }   
              //console.log(JSON.stringify(aryRslt2));
              console.log(aryRslt2);
              //resolve(JSON.stringify(aryRslt2));    
              resolve(aryRslt2); 
          });
        }else{
            console.log('WebSql Browser Flatform');
            this._db.transaction(function (tx) {
                //let qrySelect1 : string;
                if (cari) {
                  console.log('select search');
                  var qrySelect ="SELECT id, usr FROM piter WHERE usr like '%" + cari +"%' ORDER BY id DESC";
                }else{
                  console.log('select default');
                  var qrySelect ="SELECT id, usr FROM piter ORDER BY id DESC";
                };
                console.log(qrySelect);
                tx.executeSql(qrySelect, [], function(tx, results) {
                 
                    var aryRslt1=[];
                    if(results.rows.length > 0) {                
                      for(let inc = 0; inc < results.rows.length; inc++) {
                            aryRslt1.push({
                                id: results.rows.item(inc).id,
                                usr: results.rows.item(inc).usr
                            });                    
                      }                     
                   }  
                    //console.log(JSON.stringify(aryRslt));
                    console.log(aryRslt1);
                    //resolve(JSON.stringify(aryRslt)); 
                    resolve(aryRslt1);        
                });
            });         
        }  
      });   
    });
  }
  // query(query: string, params: any[] = []): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //       try {
  //           this._db.transaction((tx: any) => {
  //                   tx.executeSql(query, params,
  //                       (tx: any, res: any) => resolve({ tx: tx, res: res }),
  //                       (tx: any, err: any) => reject({ tx: tx, err: err }));
  //               },
  //               (err: any) => reject({ err: err }));
  //       } catch (err) {
  //           reject({ err: err });
  //       }
  //   });
  // }

  // create_TBL() {
  //   // this.query('CREATE TABLE IF NOT EXISTS piter (id INTEGER NULL PRIMARY KEY AUTOINCREMENT, usr TEXT, psw TEXT)').catch(err => {
  //   //   console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
  //   // });
  //   this._db.transaction(function (tx) {
  //     tx.executeSql("CREATE TABLE IF NOT EXISTS piter (id INTEGER NULL PRIMARY KEY AUTOINCREMENT, usr TEXT, psw TEXT)");
  //     // this.query('CREATE TABLE IF NOT EXISTS syaka (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, usr TEXT UNIQUE, psw TEXT)').catch(err => {
  //     tx.executeSql('CREATE TABLE IF NOT EXISTS syaka (id INTEGER NULL PRIMARY KEY AUTOINCREMENT, usr TEXT , psw TEXT)');
  
  //   });
    
  // }

  // ins_TBL = function (){
    
  //   // this.query("INSERT INTO piter (id,usr,psw)  VALUES (NULL,'admin2','12345')");
  //   this._db.transaction(function (tx) {
  //     tx.executeSql("INSERT INTO piter (id,usr,psw)  VALUES (NULL,'admin1','12345')");
  //   });
  // }

  // ins_TBL1 = function (){
  //   //this.query("INSERT INTO piter (id,usr,psw)  VALUES (NULL,'piter3','12345')");
  //   this._db.transaction(function (tx) {
  //     tx.executeSql("INSERT INTO piter (id,usr,psw)  VALUES (NULL,'admin2','12345')");
  //   });
  // }

  // public adduser(usr:string,psw:string){
  //  // console.log(data['usr']);
  //  console.log(usr);
  //   let sql ="INSERT INTO piter (usr,psw)  VALUES  (?,?)";
  //   this._db.transaction(function (tx) {
  //     tx.executeSql(sql,[usr,psw]);
  //   });
  // }
 
  // CreateUser( identification: number, name:string, lastname:string ){
  //   return new Promise((resolve, reject)=>{
  //       let sql ="INSERT INTO users (identification,name,lastname) VALUES (?,?,?)";
  //       this.database.executeSql(sql,[identification,name,lastname]).then((data)=>{
  //           resolve(data);
  //       },(error)=>{
  //         reject(error);
  //       });
  //   });
  // }

  select_TBL(){ 
    console.warn("test");
    // return new Promise(resolve => {  
    //   this._db.transaction(function (tx) {
    //     tx.executeSql("SELECT id, usr FROM piter ORDER BY id DESC", [], function(tx, results) {

    //           var aryRslt=[];
    //           if(results.rows.length > 0) {
                
    //             for(let inc = 0; inc < results.rows.length; inc++) {
    //                 //  9console.log("Result -> " + results.rows.item(i).id + " " + results.rows.item(i).usr);
    //                 //aryRslt.push({ id:results.rows.item(i).id, usr:results.rows.item(i).usr});
    //                 //console.log(results.rows.item(i).usr);
    //                   aryRslt.push({
    //                       id: results.rows.item(inc).id,
    //                       usr: results.rows.item(inc).usr
    //                   });
                    
                    
    //                 //           if(data.rows.length > 0) {
    //                 //               for(var i = 0 ; i < data.rows.length ; i++) {
    //                 //                   this.invoices.push({ name: data.rows.item(i).name });
    //                 //               }
    //                 //           }
    //             }
    //             //console.log(JSON.stringify(aryRslt));
    //              console.log(aryRslt);
    //              //resolve(JSON.stringify(aryRslt)); 
    //              resolve(aryRslt); 
    //         }
    //         //return aryRslt;
    //         // console.log(JSON.stringify(aryRslt));
    //         //console.log(aryRslt);
    //         //return aryRslt;
    //         //resolve(JSON.stringify(aryRslt));
    //        // resolve(JSON.stringify(aryRslt));
    //     });
    //   });
    // });
    //this.ListUser.push({id:'asd'});
  }
    // this.query("SELECT * FROM piter").then((data)=>{
    //   // if(results.rows.length > 0) {
    //   //   for(var i = 0; i < results.rows.length; i++) {
    //   //       console.log("Result -> " + results.rows.item(i).firstname + " " + results.rows.item(i).lastname);
    //   //   }
    //   // }
    //   if (data.res.rows.length > 0) {
    //     for(var i = 0; i < data.res.rows.length; i++) {
    //       console.log("data -> " +  data.res.rows.item(i).value);
    //     }
    //   }
    // });
  
  // private newMethod() {
  //   return this;
  // }
    // console.log('provider load');
    //     this.storage.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
    //             this.database = db;
    //             this.createTable();
    //             console.log("Berhasil");
    //             //this.insertInvoice();
    //         }, (error) => {
    //             console.log("ERROR: ", error);
    //     });  
  //}

  // public  createTable(){
  //   this.database.executeSql('create table if not exists invoices(name VARCHAR(32))', {})
  //       .then(() => {
  //           console.log('Table Invoice created !');

  //       })
  //       .catch(e => console.log(e));    
  // }
  
  // public counter : number = 0;
  // InsertInvoice(){
  //   var c = 'INV' + this.counter; 
  //   this.database.executeSql("INSERT INTO invoices (name) VALUES (?)", [c]).then((data) => {
  //           console.log("INSERTED: ");
  //           this.counter++;
  //           this.showInvoices();
  //       }, (error) => {
  //           console.log("ERROR: " + JSON.stringify(error.err));
  //       });    
  // }
  
  // public showInvoices(){
  //   this.database.executeSql("SELECT * FROM invoices", []).then((data) => {
  //           this.invoices = [];
  //           if(data.rows.length > 0) {
  //               for(var i = 0 ; i < data.rows.length ; i++) {
  //                   this.invoices.push({ name: data.rows.item(i).name });
  //               }
  //           }
  //       }, (error) => {
  //           console.log("ERROR: " + JSON.stringify(error));
  //       });    
  // }

  
  // CreateUser( identification: number, name:string, lastname:string ){
  //   return new Promise((resolve, reject)=>{
  //       let sql ="INSERT INTO users (identification,name,lastname) VALUES (?,?,?)";
  //       this.database.executeSql(sql,[identification,name,lastname]).then((data)=>{
  //           resolve(data);
  //       },(error)=>{
  //         reject(error);
  //       });
  //   });
  // }
  
  // GetAllUsers(){
  //   return new Promise((resolve,reject)=>{
  //     this.db.executeSql("SELECT * FROM users",[]).then((data)=>{
  //         let arrayUsers=[];
  //         if(data.rows.length >0){
  //             for(var i=0; i<data.rows.length; i++){                  
  //                 arrayUsers.push({
  //                   id: data.rows.items(i).id,
  //                   identification: data.rows.items(i).identification,
  //                   name: data.rows.items(i).name,
  //                   lastname: data.rows.items(i).lastname
  //                 })
  //             }
  //         }
  //         resolve(arrayUsers);
  //     },(error)=>{
  //       reject(error);
  //     })
  //   })
  // }

}
