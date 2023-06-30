import { Component } from '@angular/core';
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public env = environment

  public appPages = [
    { title: 'Início', url: '/home', icon: 'home' },
    { title: 'Sobre', url: '/about', icon: 'information-circle' },
    { title: 'Faça contato', url: '/contacts', icon: 'chatbubbles' }
  ];
  
  constructor() {}
}
