import { HttpClient } from '@angular/common/http';
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
  private readonly emailEndpoint =
    'https://us-central1-ci-garbo.cloudfunctions.net/sendEmail'; // We'll create this endpoint

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.ciCollection = this.afs.collection<Ci>('cis');
  }

  listarTodas(): Observable<Ci[]> {
    return this.ciCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Ci;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  listarPorParametro(campo: string, valor: any): Observable<Ci[]> {
    return this.afs
      .collection<Ci>('cis', (ref) => ref.where(campo, '==', valor))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Ci;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  recuperarPorParametro(campo: string, valor: any): Observable<Ci | null> {
    return this.listarPorParametro(campo, valor).pipe(
      map((cis) => (cis.length > 0 ? cis[0] : null))
    );
  }

  recuperarPorId(id: string): Observable<Ci | null> {
    return this.ciCollection
      .doc(id)
      .get()
      .pipe(
        map((doc) => {
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
    return from(this.ciCollection.add(ci)).pipe(map((docRef) => docRef.id));
  }

  enviarEmail(ci: Ci): Observable<any> {
    const emailData = {
      to: 'posgarbo@gmail.com',
      subject: 'Nova CI Registrada',
      text: `
        Nova CI registrada:
        
        Destinatário: ${ci.destinatario}
        Área do Destinatário: ${ci.areaDestinatario}
        Remetente: ${ci.remetente}
        Área do Remetente: ${ci.areaRemetente}
        Data: ${
          ci.data instanceof Date
            ? ci.data.toLocaleDateString()
            : new Date(ci.data).toLocaleDateString()
        }
        Comunicação: ${ci.comunicacao}
      `,
    };

    return this.http.post(this.emailEndpoint, emailData);
  }

  inserirComEmail(ci: Ci): Observable<string> {
    return from(this.ciCollection.add(ci)).pipe(
      map((docRef) => {
        this.enviarEmail(ci).subscribe();
        return docRef.id;
      })
    );
  }
}
