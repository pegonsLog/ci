import { Component } from '@angular/core';
import { Funcionario, Funcionarios } from '../../models/funcionario';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss',
})
export class FuncionarioFormComponent {
  funcionario: Funcionario;
  funcionarios: Funcionarios;
}
