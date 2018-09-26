import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TemperaturaProvider } from '../providers/temperatura/temperatura';
import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBbhOywlh6sjEANE_nhB7mkBHBJSq6qp_Q",
      authDomain: "freshscan-ac19a.firebaseapp.com",
      databaseURL: "https://freshscan-ac19a.firebaseio.com",
      projectId: "freshscan-ac19a",
      storageBucket: "freshscan-ac19a.appspot.com",
      messagingSenderId: "686417494321"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TemperaturaProvider,
    FcmProvider,
    Firebase
  ]
})
export class AppModule {}
