//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite';
// import { Sql } from "../database/Sql";
import { Platform } from 'ionic-angular';

class SQLiteObject{
  _objectInstance: any;

  constructor(_objectInstance: any){
      this._objectInstance = _objectInstance;
  };

  executeSql(statement: string, params: any): Promise<any>{

      return new Promise((resolve,reject)=>{
          try {
              var st = this._objectInstance.prepare(statement,params);
              var rows :Array<any> = [] ;
              while(st.step()) { 
                  var row = st.getAsObject();
                  rows.push(row)
              }
              var payload = {
                  rows: {
                  item: function(i) {
                      return rows[i];
                  },
                  length: rows.length
                  },
                  rowsAffected: this._objectInstance.getRowsModified() || 0,
                  insertId: this._objectInstance.insertId || void 0
              };  
              resolve(payload);
          } catch(e){
              reject(e);
          }
      });
  };

}


   
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/




const DB_NAME: string = 'data.db';
const win: any = window;

@Injectable()
export class DatabaseProvider {
  private database: SQLiteObject;
  private isOpen: boolean;
  private _db: any;
  
  constructor(
    public http: Http,
    public storage: SQLite,
    //private sql: Sql,
    private platform: Platform    
  ) 
  {    
  
    // if (this.isOpen){
    //   this.storage = new SQLite;
    //   this.storage.create({ name:"data.db",location:"default" }).then( ( db: SQLiteObject ) => {
    //     this.db = db;
    //     db..executeSql("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,identification INTEGER, name TEXT,lastname TEXT, )",[]);
    //     this.isOpen = false;
    //   }).catch((error) => {
    //     console.log(error);        
    //   });
    // }
    platform.ready().then(() => {
        console.log('platform load');
        if (platform._platforms[0] == 'cordova') {
          console.log('platform Cordova');
          //this.storage = win.sqlitePlugin.openDatabase({ name: DB_NAME , location:"default"});
          if (this.isOpen){
            this.storage = new SQLite;
            this.storage.create({ name: DB_NAME ,location:"default" }).then( ( db: SQLiteObject ) => {
              this.database = db;
              db.executeSql("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,identification INTEGER, name TEXT,lastname TEXT, )",[]);
              this.isOpen = false;
            }).catch((error) => {
              console.log(error);        
            });
          }
        } else {
            // console.log('platform webSql');
            // this.storage = win.openDatabase(DB_NAME, '1.0', '',1);
            
            // return new Promise((resolve, reject) => {
            //   resolve(new SQLiteObject(db));
            // });
          // this.storage = win.openDatabase({
          //   name: DB_NAME,
          //   location: 2,
          //   createFromLocation: 0
          // });
          // if (win.sqlitePlugin) {
          //   this._db = win.sqlitePlugin.openDatabase({
          //     name: DB_NAME,
          //     location: 2,
          //     createFromLocation: 0
          //   });
          // }else{
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
      
            this._db = win.openDatabase(DB_NAME, '1.0', '', 5 * 1024 * 1024);
          // }  
        }   
          this.create_TBL();			
          //this.ins_TBL();	
         // this.select_TBL();		
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

  create_TBL() {
    // this.query('CREATE TABLE IF NOT EXISTS piter (id INTEGER NULL PRIMARY KEY AUTOINCREMENT, usr TEXT, psw TEXT)').catch(err => {
    //   console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
    // });
    this._db.transaction(function (tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS piter (id INTEGER NULL PRIMARY KEY AUTOINCREMENT, usr TEXT, psw TEXT)");
    });
    // this.query('CREATE TABLE IF NOT EXISTS syaka (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, usr TEXT UNIQUE, psw TEXT)').catch(err => {
    //    console.error('Storage: Unable to create initial storage tables', err.tx, err.err); 
    // });
  }

  ins_TBL = function (){
    
    // this.query("INSERT INTO piter (id,usr,psw)  VALUES (NULL,'admin2','12345')");
    this._db.transaction(function (tx) {
      tx.executeSql("INSERT INTO piter (id,usr,psw)  VALUES (NULL,'admin1','12345')");
    });
  }

  ins_TBL1 = function (){
    //this.query("INSERT INTO piter (id,usr,psw)  VALUES (NULL,'piter3','12345')");
    this._db.transaction(function (tx) {
      tx.executeSql("INSERT INTO piter (id,usr,psw)  VALUES (NULL,'admin2','12345')");
    });
  }

  public adduser(usr:string,psw:string){
   // console.log(data['usr']);
   console.log(usr);
    let sql ="INSERT INTO piter (usr,psw)  VALUES  (?,?)";
    this._db.transaction(function (tx) {
      tx.executeSql(sql,[usr,psw]);
    });
  }
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
    return new Promise(resolve => {  
      this._db.transaction(function (tx) {
        tx.executeSql("SELECT id, usr FROM piter ORDER BY id DESC", [], function(tx, results) {

              var aryRslt=[];
              if(results.rows.length > 0) {
                
                for(let inc = 0; inc < results.rows.length; inc++) {
                    //  9console.log("Result -> " + results.rows.item(i).id + " " + results.rows.item(i).usr);
                    //aryRslt.push({ id:results.rows.item(i).id, usr:results.rows.item(i).usr});
                    //console.log(results.rows.item(i).usr);
                      aryRslt.push({
                          id: results.rows.item(inc).id,
                          usr: results.rows.item(inc).usr
                      });
                    
                    
                    //           if(data.rows.length > 0) {
                    //               for(var i = 0 ; i < data.rows.length ; i++) {
                    //                   this.invoices.push({ name: data.rows.item(i).name });
                    //               }
                    //           }
                }
                //console.log(JSON.stringify(aryRslt));
                 console.log(aryRslt);
                 //resolve(JSON.stringify(aryRslt)); 
                 resolve(aryRslt); 
            }else{
              let aryRslt='';
            }
            //return aryRslt;
            // console.log(JSON.stringify(aryRslt));
            //console.log(aryRslt);
            //return aryRslt;
            //resolve(JSON.stringify(aryRslt));
           // resolve(JSON.stringify(aryRslt));
        });
      });
    });
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
