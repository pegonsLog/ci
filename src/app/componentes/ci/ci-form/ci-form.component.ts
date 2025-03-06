import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CiService } from '../../services/ci.service';
import { Ci } from '../../models/ci';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-ci-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    MatNativeDateModule
  ],
  templateUrl: './ci-form.component.html',
  styleUrl: './ci-form.component.scss',
})
export class CiFormComponent implements OnInit {
  ciForm: FormGroup;
  id: string | null = null;
  isEdicao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ciService: CiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ciForm = this.formBuilder.group({
      numero: ['', Validators.required],
      data: ['', Validators.required],
      assunto: ['', Validators.required],
      destinatario: ['', Validators.required],
      remetente: ['', Validators.required],
      conteudo: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdicao = true;
      this.carregarCI(this.id);
    }
  }
  carregarCI(id: string): void {
    this.ciService.recuperarPorId(id).subscribe({
      next: (ci: any) => {
        this.ciForm.patchValue(ci);
      },
      error: (erro) => {
        console.error('Erro ao carregar CI:', erro);
        // Aqui você pode adicionar uma lógica para mostrar mensagem de erro
      }
    });
  }

  onSubmit(): void {
    if (this.ciForm.valid) {
      const ci: Ci = this.ciForm.value;
      
      if (this.isEdicao && this.id) {
        this.ciService.atualizar(this.id, ci).subscribe({
          next: () => {
            this.router.navigate(['/ci']);
          },
          error: (erro) => {
            console.error('Erro ao atualizar CI:', erro);
            // Aqui você pode adicionar uma lógica para mostrar mensagem de erro
          }
        });
      } else {
        this.ciService.inserir(ci as unknown as Omit<Ci, 'id'>).subscribe({
          next: () => {
            this.router.navigate(['/ci']);
          },
          error: (erro) => {
            console.error('Erro ao inserir CI:', erro);
            // Aqui você pode adicionar uma lógica para mostrar mensagem de erro
          }
        });
      }
    }
  }

  onCancelar(): void {
    this.router.navigate(['/ci']);
  }

  onImprimir(): void {
    window.print();
  }

  onSalvar(): void {
    this.onSubmit();
  }
}
