import { LoginComponent } from './login/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CadastroComponent } from './login/cadastro/cadastro.component';
import { ProjectComponent } from './system/project/project.component';
import { MappingComponent } from './system/mapping/mapping.component';
import { RoutineComponent } from './system/routine/routine.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'usuario/cadastro',
    component: CadastroComponent
  },
  {
    path: 'system',
    component: ProjectComponent
  },
  {
    path: 'system/mapping',
    component: MappingComponent
  },
  {
    path: 'system/routine',
    component: RoutineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
