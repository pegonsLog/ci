import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Funcionario } from '../models/funcionario';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private readonly collection: AngularFirestoreCollection<Funcionario>;

  constructor(private readonly afs: AngularFirestore) {
    this.collection = afs.collection<Funcionario>('funcionarios');
  }

  inserir(funcionario: Funcionario): Observable<any> {
    return from(this.collection.add(funcionario));
  }

  atualizar(id: string, funcionario: Partial<Funcionario>): Observable<any> {
    return from(this.collection.doc(id).update(funcionario));
  }

  remover(id: string): Observable<any> {
    return from(this.collection.doc(id).delete());
  }

  listarTodos(): Observable<Funcionario[]> {
    // Se necessário, pode ser configurado para ordenar pelo nome aqui.
    return this.collection.valueChanges({ idField: 'id' });
  }

  listarPorParametro(param: string, valor: any): Observable<Funcionario[]> {
    return this.afs
      .collection<Funcionario>('funcionarios', (ref) =>
        ref.where(param, '==', valor)
      )
      .valueChanges({ idField: 'id' });
  }

  recuperarPorId(id: string): Observable<Funcionario | undefined> {
    return this.collection.doc<Funcionario>(id).valueChanges();
  }

  recuperarPorParametro(
    param: string,
    valor: any
  ): Observable<Funcionario | undefined> {
    return this.afs
      .collection<Funcionario>('funcionarios', (ref) =>
        ref.where(param, '==', valor)
      )
      .valueChanges({ idField: 'id' })
      .pipe(map((funcionarios) => funcionarios && funcionarios[0]));
  }
}
