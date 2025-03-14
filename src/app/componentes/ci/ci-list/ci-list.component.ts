import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ci } from '../../models/ci';
import { CiService } from '../../services/ci.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ci-list',
  standalone: true,
  imports: [AngularMaterialModule, HeaderComponent, FooterComponent, DatePipe],
  templateUrl: './ci-list.component.html',
  styleUrl: './ci-list.component.scss',
})
export class CiListComponent implements OnInit {
  displayedColumns: string[] = [
    'destinatario',
    'areaDestinatario',
    'remetente',
    'areaRemetente',
    'comunicacao',
    'data',
    'acoes',
  ];
  dataSource: MatTableDataSource<Ci>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ciService: CiService, private router: Router) {
    this.dataSource = new MatTableDataSource<Ci>();
  }

  ngOnInit(): void {
    this.loadCis();
  }

  loadCis() {
    this.ciService.listarTodas().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: string) {
    this.router.navigate(['ci-form', id]);
  }

  delete(id: string) {
    this.ciService.remover(id).subscribe(() => {
      this.loadCis();
    });
  }

  adicionar() {
    this.router.navigate(['ci-form']);
  }

  onCancelar() {
    this.router.navigate(['/home']);
  }
}
