import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { PhonebookComponent } from './components/phonebook/phonebook/phonebook.component';


const redirecToLogin = () => redirectUnauthorizedTo(['login']);

const redirectToHome = () => redirectLoggedInTo(['home']);


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'products',
    component: ProductListComponent,
    ...canActivate(redirecToLogin)
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirecToLogin)
  },
  {
    path: 'phonebook',
    component: PhonebookComponent,
    ...canActivate(redirecToLogin)
  },

  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
