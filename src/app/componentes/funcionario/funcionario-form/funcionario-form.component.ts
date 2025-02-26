import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss'],
})
export class FuncionarioFormComponent implements OnInit {
  form;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService
  ) {
    this.form = this.fb.group({
      matricula: ['', Validators.required],
      nome: ['', Validators.required],
      cargo: ['', Validators.required],
      perfil: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  // Utilizando signal para armazenar o ID do funcionário (caso exista)
  funcionarioId = signal<string | null>(null);

  ngOnInit(): void {
    // Recupera parâmetros da rota
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.funcionarioId.set(params['id']);
        // Carrega os dados para edição
        this.funcionarioService
          .recuperarPorId(params['id'])
          .subscribe((data) => {
            if (data) {
              this.form.patchValue(data);
            }
          });
      }
    });
  }

  onSave(): void {
    if (this.form.valid) {
      if (this.funcionarioId()) {
        // Atualização
        this.funcionarioService
          .atualizar(this.funcionarioId()!, this.form.value)
          .subscribe(() => {
            this.router.navigate(['/funcionarios']);
          });
      } else {
        // Inserção (o Firestore gera o id automaticamente)
        const novoFuncionario: Funcionario = {
          id: '',
          matricula: this.form.value.matricula,
          nome: this.form.value.nome,
          cargo: this.form.value.cargo,
          perfil: this.form.value.perfil,
          senha: this.form.value.senha,
        };
        this.funcionarioService.inserir(novoFuncionario).subscribe(() => {
          this.router.navigate(['/funcionarios']);
        });
      }
    }
  }

  onPrint(): void {
    // Implementar a lógica de impressão
    console.log('Função imprimir não implementada.');
  }

  onCancel(): void {
    this.router.navigate(['/funcionarios']);
  }
}
