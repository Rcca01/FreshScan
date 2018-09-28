import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.notificationStatus = functions.database.ref('/perigo/status')
.onUpdate(async event => {

  //Notification content
  const payload = {
    notification: {
        title: 'Alerta de temperatura',
        body: 'Temperatura do local está acima do permitido',
        icon: 'default'
    }
  }

  const status = event.data.val();
  const db = admin.database();
  const tokens = [];


  db.ref('/devices').once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      tokens.push(childSnapshot.val().token);
    })
  }).catch((error)=>{
    console.log(error);
  })

  return admin.messaging().sendToDevice(tokens,payload);
});