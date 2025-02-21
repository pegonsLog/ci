import { Component } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
