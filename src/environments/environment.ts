// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'IonicAngular',
  appSlogan: 'Devaneios Acumulativos',
  signInMethod: 'redirect', //redirect || popup
  policiesDate: '2023-07-07',
  firebase: {
    apiKey: 'AIzaSyDtamD5SJ4cHXE9ej57xiQwPVirnYbDG9A',
  authDomain: 'ionicangular-55786.firebaseapp.com',
  projectId: 'ionicangular-55786',
  storageBucket: 'ionicangular-55786.appspot.com',
  messagingSenderId: '750675257411',
  appId: '1:750675257411:web:b4e5727109684614ff0cf6'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
