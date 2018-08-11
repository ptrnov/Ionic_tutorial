import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MenuPage } from '../pages/menu/menu';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AdduserPage } from '../pages/adduser/adduser';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule } from '@angular/http';
//import { SQLite } from '@ionic-native/sqlite';
//import { SQLite , SQLiteDatabaseConfig , SQLiteObject } from '@ionic-native/sqlite';
//== Import SQLiteObject diganti dengan Class SQLiteObject Tiruan ==
import { SQLite , SQLiteDatabaseConfig} from '@ionic-native/sqlite';
import { Sql } from "../providers/database/Sql";

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
            rows.push(row);
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
  
        //save database after each sql query 
  
        var arr : ArrayBuffer = this._objectInstance.export();
        localStorage.setItem("database",String(arr));
        resolve(payload);
      } catch(e){
        reject(e);
      }
    });
  };
  
}

declare var SQL;
class SQLiteMock {
  public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
     //var db = new SQL.Database();
      // return new Promise((resolve,reject)=>{
      //   //resolve(new SQLiteObject(new Object()));
      //   resolve(new SQLiteObject(db));
      // });

      var db;
      var storeddb = localStorage.getItem("database");
  
      var arr = storeddb.split(',');
      if(storeddb)
      {
          db = new SQL.Database(arr);
      }
      else
      {
          db = new SQL.Database();
         
      }
      return new Promise((resolve,reject)=>{
        resolve(new SQLiteObject(db));
    });
      
  }
} 


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MenuPage,
    AdduserPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //IonicModule.forRoot(MyApp)
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MenuPage,
    AdduserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //SQLite,
    Sql,
    {provide: SQLite, useClass: SQLiteMock},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
