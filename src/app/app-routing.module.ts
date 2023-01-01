import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AddAnimalComponent } from './components/add-animal/add-animal.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // Animals CRUD
  { path: 'animals', component: AnimalsListComponent },
  { path: 'animals/:id', component: AnimalDetailsComponent },
  { path: 'add', component: AddAnimalComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
