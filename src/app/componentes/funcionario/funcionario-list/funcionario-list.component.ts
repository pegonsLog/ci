import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

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
  onCancelar() {
    this.router.navigate(['/home']);
  }
}
