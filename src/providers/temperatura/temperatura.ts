import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';

/*
  Generated class for the TemperaturaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TemperaturaProvider {

  constructor(
    private db: AngularFireDatabase
  ) {

  }

  getTemperatura():Observable<{}[]>{
    return  this.db.list('temperatura').valueChanges();
  }

}
