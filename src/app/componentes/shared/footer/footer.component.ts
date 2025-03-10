import { Component } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
