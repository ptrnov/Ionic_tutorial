//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite} from '@ionic-native/sqlite';

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
@Injectable()
export class DatabaseProvider {
  private db: SQLiteObject;
  private isOpen: boolean;
  
  constructor(
    public http: Http,
    public storage: SQLite  
  ) {
    if (this.isOpen){
      this.storage = new SQLite;
      this.storage.create({ name:"data.db",location:"default" }).then( ( db: SQLiteObject ) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,identification INTEGER, name TEXT,lastname TEXT, )",[]);
        this.isOpen = false;
      }).catch((error) => {
        console.log(error);        
      });
    }
  }

  public  createTable(){
    this.database.executeSql('create table if not exists invoices(name VARCHAR(32))', {})
        .then(() => {
            console.log('Table Invoice created !');

        })
        .catch(e => console.log(e));    
  }
  
  CreateUser( identification: number, name:string, lastname:string ){
    return new Promise((resolve, reject)=>{
        let sql ="INSERT INTO users (identification,name,lastname) VALUES (?,?,?)";
        this.db.executeSql(sql,[identification,name,lastname]).then((data)=>{
            resolve(data);
        },(error)=>{
          reject(error);
        });
    });
  }
  
  GetAllUsers(){
    return new Promise((resolve,reject)=>{
      this.db.executeSql("SELECT * FROM users",[]).then((data)=>{
          let arrayUsers=[];
          if(data.rows.length >0){
              for(var i=0; i<data.rows.length; i++){                  
                  arrayUsers.push({
                    id: data.rows.items(i).id,
                    identification: data.rows.items(i).identification,
                    name: data.rows.items(i).name,
                    lastname: data.rows.items(i).lastname
                  })
              }
          }
          resolve(arrayUsers);
      },(error)=>{
        reject(error);
      })
    })
  }

}
