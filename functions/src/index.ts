import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase)

exports.notificationStatusPerigo = functions.database.ref('/perigo')
.onUpdate(async event =>{

  const status = event.after.val();
  const db =  admin.database();
  const tokens = [];

  const payload = {
    notification: {
      title: 'Alerta de temperatura',
      body: 'Temperatura do local está acima do permitido',
      icon: 'default'
    }
  }

  if(status.status == 1){
    payload.notification.body = 'Temperatura do local está normal agora';
  }

  // db.ref('/devices/').once('value').then((snapshot:admin.database.DataSnapshot)=>{
  //   snapshot.forEach((childSnapshot)=>{
  //     tokens.push(childSnapshot.val().token);
  //     return false;
  //   })
  // }).catch((error)=>{console.log(error)});

  tokens.push('fmOTH73wInk:APA91bEvPLR7fV2mR0Od1Kho033wap7hWbo2Jum8KLGccLHPdjp3vf_Ti83e9FBWiL6rU0vxfrSdj6eX_E5xVJIOrhHaQ16VIPbgSTHRdR2uQnXchmhyAOGzFgVfmEFyi-tZFxYQCRZ_');

  return admin.messaging().sendToDevice(tokens,payload)
})
