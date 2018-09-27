import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import 'firebase-functions';
admin.initializeApp();

exports.newSubscriberNotification = functions.database.ref('/perigo/status')
.onUpdate((event:functions.Event<functions.database.DeltaSnapshot>) => {

  //Notification content
  const payload:admin.messaging.MessagingPayload = {
    notification: {
        title: 'Alerta de temperatura',
        body: 'Temperatura do local está acima do permitido',
        icon: 'default'
    }
  }

  const status = event.data.val();
  const db = admin.database();
  const tokens = [];


  db.ref('/devices').once('value').then((snapshot) => {
    snapshot.forEach(function(childSnapshot){
      tokens.push(childSnapshot.val().token);
    })
  })

  return admin.messaging().sendToDevice(tokens,payload).then((response)=>{
    console.log(response)
  }).catch((error)=>{
    console.log(error);
  })

});
