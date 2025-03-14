import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CiService } from '../../services/ci.service';
import { Ci } from '../../models/ci';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ci-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatNativeDateModule,
  ],
  templateUrl: './ci-form.component.html',
  styleUrl: './ci-form.component.scss',
})
export class CiFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private ciService = inject(CiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ciForm: FormGroup;
  id: string | null = null;
  isEdicao: boolean = false;

  constructor() {
    this.ciForm = this.formBuilder.group({
      destinatario: ['', Validators.required],
      areaDestinatario: ['', Validators.required],
      remetente: ['', Validators.required],
      areaRemetente: ['', Validators.required],
      comunicacao: ['', Validators.required],
      data: ['', Validators.required],
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
      next: (ci: Ci) => {
        this.ciForm.patchValue(ci);
      },
      error: (erro: Error) => {
        console.error('Erro ao carregar CI:', erro);
      },
    });
  }

  onSubmit(enviarEmail: boolean = false): void {
    if (this.ciForm.valid) {
      const ci: Ci = this.ciForm.value;

      if (this.isEdicao && this.id) {
        this.atualizarCI(this.id, ci, enviarEmail);
      } else {
        this.inserirCI(ci, enviarEmail);
      }
    }
  }

  private inserirCI(ci: Ci, enviarEmail: boolean): void {
    if (enviarEmail) {
      this.ciService
        .inserirComEmail(ci as unknown as Omit<Ci, 'id'>)
        .subscribe({
          next: () => {
            console.log('CI inserida e email enviado com sucesso');
            this.router.navigate(['/ci']);
          },
          error: (erro: Error) => {
            console.error('Erro ao inserir CI com email:', erro);
          },
        });
    } else {
      this.ciService.inserir(ci as unknown as Omit<Ci, 'id'>).subscribe({
        next: () => {
          console.log('CI inserida com sucesso');
          this.router.navigate(['/ci']);
        },
        error: (erro: Error) => {
          console.error('Erro ao inserir CI:', erro);
        },
      });
    }
  }

  private atualizarCI(id: string, ci: Ci, enviarEmail: boolean): void {
    if (enviarEmail) {
      this.ciService.atualizar(id, ci).subscribe({
        next: () => {
          this.ciService.enviarEmail(ci).subscribe({
            next: () => {
              console.log('CI atualizada e email enviado com sucesso');
              this.router.navigate(['/ci']);
            },
            error: (erro: Error) => {
              console.error('Erro ao enviar email:', erro);
              this.router.navigate(['/ci']);
            },
          });
        },
        error: (erro: Error) => {
          console.error('Erro ao atualizar CI:', erro);
        },
      });
    } else {
      this.ciService.atualizar(id, ci).subscribe({
        next: () => {
          console.log('CI atualizada com sucesso');
          this.router.navigate(['/ci']);
        },
        error: (erro: Error) => {
          console.error('Erro ao atualizar CI:', erro);
        },
      });
    }
  }

  onCancelar(): void {
    this.router.navigate(['/home']);
  }

  onSalvar(): void {
    this.onSubmit(false); // Salva sem enviar email
  }

  onSalvarEEnviar(): void {
    this.onSubmit(true); // Salva e envia email
  }
}
