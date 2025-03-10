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
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AngularMaterialModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss'],
})
export class FuncionarioListComponent implements OnInit {
  // Observável com a lista de funcionários
  funcionarios$: Observable<Funcionario[]>;

  displayedColumns: string[] = [
    // 'id',
    'matricula',
    'nome',
    'cargo',
    'perfil',
    'acoes',
  ];

  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly router: Router
  ) {
    this.funcionarios$ = this.funcionarioService.listarTodos();
  }

  ngOnInit(): void {
    // Se necessário, pode-se implementar ordenação pelo nome aqui ou utilizar matSort no template.
  }

  onEdit(funcionario: Funcionario): void {
    // Navega para o formulário com o id para edição
    this.router.navigate(['/funcionario-form', funcionario.id]);
  }

  onDelete(funcionario: Funcionario): void {
    this.funcionarioService.remover(funcionario.id).subscribe();
  }

  adicionar() {
    this.router.navigate(['/funcionario-form']);
  }
}
