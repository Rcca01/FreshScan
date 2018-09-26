import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afd: AngularFireDatabase,
    private platform: Platform
  ) {}

  // Get permission from the user
  async getToken() {

  let token;

  if (this.platform.is('android')) {
    token = await this.firebaseNative.getToken()
  }

  if (this.platform.is('ios')) {
    token = await this.firebaseNative.getToken();
    await this.firebaseNative.grantPermission();
  }

  return this.saveTokenToFirestore(token)
}

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if(!token) return;

    const devicesRef = this.afd.list('devices')

    const docData = {
      token: token,
      userId:  'testUser',
    }

    return devicesRef.push(docData);
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

}
