import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { Ci } from '../models/ci';

@Injectable({
  providedIn: 'root',
})
export class CiService {
  private ciCollection: AngularFirestoreCollection<Ci>;

  constructor(private afs: AngularFirestore) {
    this.ciCollection = this.afs.collection<Ci>('cis');
  }

  listarTodas(): Observable<Ci[]> {
    return this.ciCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Ci;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listarPorParametro(campo: string, valor: any): Observable<Ci[]> {
    return this.afs.collection<Ci>('cis', ref => ref.where(campo, '==', valor))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Ci;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  recuperarPorParametro(campo: string, valor: any): Observable<Ci | null> {
    return this.listarPorParametro(campo, valor).pipe(
      map(cis => cis.length > 0 ? cis[0] : null)
    );
  }

  recuperarPorId(id: string): Observable<Ci | null> {
    return this.ciCollection.doc(id).get().pipe(
      map(doc => {
        if (doc.exists) {
          const data = doc.data() as Ci;
          return { id: doc.id, ...data };
        }
        return null;
      })
    );
  }

  remover(id: string): Observable<void> {
    return from(this.ciCollection.doc(id).delete());
  }

  atualizar(id: string, data: Partial<Ci>): Observable<void> {
    return from(this.ciCollection.doc(id).update(data));
  }

  inserir(ci: Ci): Observable<string> {
    return from(this.ciCollection.add(ci)).pipe(
      map(docRef => docRef.id)
    );
  }
}
