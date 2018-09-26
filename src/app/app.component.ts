import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    fcm: FcmProvider,
    toastCtrl: ToastController
    ) {
    platform.ready().then(() => {

      fcm.getToken();
      fcm.listenToNotifications().pipe(
        tap(msg =>{
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

