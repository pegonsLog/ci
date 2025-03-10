import { Component } from '@angular/core';
import { Funcionario, Funcionarios } from '../../models/funcionario';

@Component({
  selector: 'app-ci-list',
  standalone: true,
  imports: [],
  templateUrl: './ci-list.component.html',
  styleUrl: './ci-list.component.scss',
})
export class CiListComponent {
  funcionario: Funcionario;
  funcionarios: Funcionarios;
}
