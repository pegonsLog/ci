import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    
  }
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
  {
    path: 'usuario-form',
    loadComponent: () =>
      import('./componentes/users/usuario-form/usuario-form.component').then(
        (m) => m.UsuarioFormComponent
      ),
  },
  {
    path: 'usuario-list',
    loadComponent: () =>
      import('./componentes/users/usuario-list/usuario-list.component').then(
        (m) => m.UsuarioListComponent
      ),
  },
];
