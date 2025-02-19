import { Component } from '@angular/core';
import { Funcionario, Funcionarios } from '../../models/funcionario';

@Component({
  selector: 'app-ci-form',
  standalone: true,
  imports: [],
  templateUrl: './ci-form.component.html',
  styleUrl: './ci-form.component.scss',
})
export class CiFormComponent {
  funcionario: Funcionario;
  funcionarios: Funcionarios;
}
