import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private router: Router) {}

  escreverCI(): void {
    this.router.navigate(['/ci-form']);
  }

  suasCIs(): void {
    this.router.navigate(['/ci-list']);
  }

  administrarUsuarios(): void {
    this.router.navigate(['/funcionario-list']);
  }

  sair(): void {
    this.router.navigate(['/login']);
  }
}
