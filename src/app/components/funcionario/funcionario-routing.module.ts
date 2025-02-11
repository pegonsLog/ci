import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormFuncionarioComponent } from './form-funcionario/form-funcionario.component';
import { ListFuncionarioComponent } from './list-funcionario/list-funcionario.component';

const routes: Routes = [
  { path: 'form-funcionario', component: FormFuncionarioComponent },
  { path: 'list-funcionario', component: ListFuncionarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule {}
