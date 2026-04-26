import { Routes } from '@angular/router';
import { UserForm } from './components/user-form/user-form';
import { Product } from './components/product/product';

export const routes: Routes = [
  { path: '', redirectTo: 'user-form', pathMatch: 'full' },
  { path: 'user-form', component: UserForm },
  { path: 'products', component: Product },
];