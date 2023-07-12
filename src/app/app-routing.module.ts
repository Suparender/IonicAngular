import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment as env } from './../environments/environment';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AuthGuard } from '@angular/fire/auth-guard/'


const toLogin = () => redirectUnauthorizedTo(['/login']) 
const toHome =  () => redirectLoggedInTo(['/home'])

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule) 
  },
  {
    path: 'home',
    title: `${env.appName} - Início`,
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about',
    title: `${env.appName} - Sobre`,
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'contacts',
    title: `${env.appName} - Contatos`,
    loadChildren: () => import('./pages/contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: '404',
    title: `${env.appName} - Erro 404`,
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'login',
    title: `${env.appName} - Entrar`,
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: toHome }
  },
  {
    path: 'profile',
    title: `${env.appName} - Perfil`,
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'logout',
    title: `${env.appName} - Sair`,
    loadChildren: () => import('./user/logout/logout.module').then( m => m.LogoutPageModule),
    canActivate: [AuthGuard],
    data: { AuthGuardPipe: toLogin }
  },
  {
    path: 'policies',
    title: `${env.appName} - Politicas`,
    loadChildren: () => import('./pages/policies/policies.module').then( m => m.PoliciesPageModule)
  },
  {
    path: 'fortrecs',
    title: `${env.appName} - ForTrunks`,
    loadChildren: () => import('./pages/fortrecs/fortrecs.module').then( m => m.FortrecsPageModule)
  },
  {
    path: 'fbpopulate',
    loadChildren: () => import('./fbpopulate/fbpopulate.module').then( m => m.FbpopulatePageModule)
  },
  {
    path: 'view/:id',
    title: `${env.appName} - Exibição de treco`,
    loadChildren: () => import('./pages/view/view.module').then( m => m.ViewPageModule)
  },
  {
    path:'**',
    redirectTo: '404',
    pathMatch: 'full'
  }
  
  
  


 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
