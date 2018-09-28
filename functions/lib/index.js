"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.notificationStatus = functions.database.ref('/perigo/status')
    .onUpdate((event) => __awaiter(this, void 0, void 0, function* () {
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
    })

    return admin.messaging().sendToDevice("fwJ65yTWUQQ:APA91bHi8DFt7Telrh402BvtYcdoMcUiOQz6RMef_3iyKqmNaf3YBlxnlavGwNC6U9CrczN0RnNKqUOa7d2xLzlrKoi8FDs",payload);
}));
//# sourceMappingURL=index.js.map