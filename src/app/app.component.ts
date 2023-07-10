import { Component, inject, OnDestroy } from '@angular/core';
import { environment } from './../environments/environment';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';
import { empty, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {

  public env = environment

  // autenticação firebase
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;


  constructor() {
    // mostra pessoa logada e troca informações 
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser)
      if (aUser !== null) {
        this.appUser = {
          logged: true,
          title: aUser.displayName + '',
          url: '/profile',
          icon: 'log-out',
          avatar: aUser.photoURL + ''
        }
      }
    })

  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }



  // caminho dos botões do menu
  public appPages = [
    { title: 'Início', url: '/home', icon: 'home' },
    { title: 'Sobre', url: '/about', icon: 'information-circle' },
    { title: 'Faça contato', url: '/contacts', icon: 'chatbubbles' },
    { title: 'Politicas de privacidade', url: '/policies', icon: 'document-lock' },
    { title: 'ForTrunks', url: '/fortrecs', icon: 'rose' }
  ];


  public appUser = {
    logged: false,
    title: 'Login / Entrar',
    url: '/login',
    icon: 'log-in',
    avatar: ''
  }

  

}
