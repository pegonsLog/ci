import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AngularMaterialModule,
  ],
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss'],
})
export class FuncionarioListComponent implements OnInit {
  // Observável com a lista de funcionários
  funcionarios$: Observable<Funcionario[]>;

  displayedColumns: string[] = [
    'matricula',
    'nome',
    'cargo',
    'perfil',
    'acoes',
  ];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {
    this.funcionarios$ = this.funcionarioService.listarTodos();
  }

  ngOnInit(): void {
    // Se necessário, pode-se implementar ordenação pelo nome aqui ou utilizar matSort no template.
  }

  onEdit(funcionario: Funcionario): void {
    // Navega para o formulário com o id para edição
    this.router.navigate(['/funcionarios/form', funcionario.id]);
  }

  onDelete(funcionario: Funcionario): void {
    this.funcionarioService.remover(funcionario.id).subscribe();
  }

  onPrint(funcionario: Funcionario): void {
    // Implementar a lógica de impressão
    console.log('Imprimir funcionário:', funcionario);
  }
}
