import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./componentes/login/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./componentes/home/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'ci-form',
    loadComponent: () =>
      import('./componentes/ci/ci-form/ci-form.component').then(
        (m) => m.CiFormComponent
      ),
  },
  {
    path: 'ci-list',
    loadComponent: () =>
      import('./componentes/ci/ci-list/ci-list.component').then(
        (m) => m.CiListComponent
      ),
  },
  {
    path: 'funcionario-form',
    loadComponent: () =>
      import(
        './componentes/funcionario/funcionario-form/funcionario-form.component'
      ).then((m) => m.FuncionarioFormComponent),
  },
  {
    path: 'funcionario-list',
    loadComponent: () =>
      import(
        './componentes/funcionario/funcionario-list/funcionario-list.component'
      ).then((m) => m.FuncionarioListComponent),
  },
];
