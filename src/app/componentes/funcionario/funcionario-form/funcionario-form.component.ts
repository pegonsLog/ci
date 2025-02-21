import { Component, Input, signal } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { CiService } from '../../services/ci.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [AngularMaterialModule, HeaderComponent],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss',
})
export class FuncionarioFormComponent {
  // Se o formulário for usado para edição, o registro pode ser recebido via @Input
  @Input() funcionarioEdit?: Funcionario;

  funcionario = signal<Funcionario>({
    id: '',
    matricula: '',
    nome: '',
    cargo: '',
    perfil: '',
    senha: '',
  });

  constructor(private ciService: CiService) {}

  ngOnInit(): void {
    if (this.funcionarioEdit) {
      // Se for edição, inicializa o signal com os dados existentes
      this.funcionario.set(this.funcionarioEdit);
    }
  }

  // Atualiza o valor de um campo específico do modelo
  update(field: keyof Funcionario, value: string): void {
    this.funcionario.update((current) => ({ ...current, [field]: value }));
  }

  // Salva o registro utilizando o service (para criação ou atualização)
  salvar(): void {
    const data = this.funcionario();
    this.ciService
      .saveRecord(data)
      .then(() => console.log('Registro salvo com sucesso!'))
      .catch((err) => console.error('Erro ao salvar registro:', err));
  }

  // Salva o registro e, em seguida, envia um email com os dados
  salvarEEnviarEmail(): void {
    const data = this.funcionario();
    this.ciService
      .saveRecord(data)
      .then(() => this.ciService.sendEmail(data))
      .then(() => console.log('Registro salvo e email enviado com sucesso!'))
      .catch((err) =>
        console.error('Erro ao salvar registro ou enviar email:', err)
      );
  }

  // Lógica para sair do formulário (pode ser redirecionar para outra rota ou fechar modal)
  sair(): void {
    console.log('Saindo do formulário...');
    // Implemente a navegação ou lógica de fechamento aqui
  }
}
