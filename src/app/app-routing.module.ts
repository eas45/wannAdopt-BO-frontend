import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AddAnimalComponent } from './components/add-animal/add-animal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // Animals CRUD
  {
    path: 'animals',
    canActivate: [IsLoggedInGuard],
    component: AnimalsListComponent
  },
  {
    path: 'animals/:id',
    canActivate: [IsLoggedInGuard],
    component: AnimalDetailsComponent
  },
  {
    path: 'add',
    canActivate: [IsLoggedInGuard],
    component: AddAnimalComponent
  },
  {
    path: 'profile',
    canActivate: [IsLoggedInGuard],
    component: ProfileComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
