import { Component } from '@angular/core';
import { Funcionario, Funcionarios } from '../../models/funcionario';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss',
})
export class FuncionarioListComponent {
  funcionario: Funcionario;
  funcionarios: Funcionarios;
}
