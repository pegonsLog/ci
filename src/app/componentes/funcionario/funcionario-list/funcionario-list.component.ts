import { Component } from '@angular/core';
import { Funcionario, Funcionarios } from '../../models/funcionario';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss',
})
export class FuncionarioListComponent {
  funcionario: Funcionario;
  funcionarios: Funcionarios;
}
