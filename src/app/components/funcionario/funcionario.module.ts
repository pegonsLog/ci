import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { FormFuncionarioComponent } from './form-funcionario/form-funcionario.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { ListFuncionarioComponent } from './list-funcionario/list-funcionario.component';

@NgModule({
  declarations: [FormFuncionarioComponent, ListFuncionarioComponent],
  imports: [CommonModule, FuncionarioRoutingModule, IonicModule],
  exports: [FormFuncionarioComponent, ListFuncionarioComponent],
})
export class FuncionarioModule {}
