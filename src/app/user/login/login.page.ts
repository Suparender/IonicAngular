import { Component, inject, OnInit } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signInWithRedirect, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public env = environment
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor() {
    // mostra pessoa logada e troca informações 
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser)
      if (aUser !== null) {
        location.href = '/home'
      }
    })
 }

  ngOnInit() {
  }

  // login
  login() {

    //signInWithPopup(this.auth, new GoogleAuthProvider())
    signInWithRedirect(this.auth, new GoogleAuthProvider())
      .then((a) => {
        location.href = '/home';
      })
      .catch((error) => {
        console.error(error.code, error.message, error.customData.email);
        alert("Oooops! Ocorreram erros ao fazer login.");
      })

  }

}
