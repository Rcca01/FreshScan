import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TemperaturaProvider } from '../../providers/temperatura/temperatura';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  protected valorTemperatura:any;

  constructor(
    public navCtrl: NavController,
    public tempProvider:TemperaturaProvider
  ) {
    this.tempProvider.getTemperatura().subscribe((result)=>{
     this.valorTemperatura = result[0];
    });
  }
}
