import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where, doc, getDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Ci } from '../models/ci';

@Injectable({
  providedIn: 'root',
})
export class CiService {

  constructor(private firestore: Firestore) {}

  listarTodas(): Observable<Ci[]> {
    const ciRef = collection(this.firestore, 'cis');
    return from(getDocs(ciRef)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ci)))
    );
  }

  listarPorParametro(campo: string, valor: any): Observable<Ci[]> {
    const ciRef = collection(this.firestore, 'cis');
    const q = query(ciRef, where(campo, '==', valor));
    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ci)))
    );
  }

  recuperarPorParametro(campo: string, valor: any): Observable<Ci | null> {
    return this.listarPorParametro(campo, valor).pipe(
      map(cis => cis.length > 0 ? cis[0] : null)
    );
  }

  recuperarPorId(id: string): Observable<Ci | null> {
    const docRef = doc(this.firestore, 'cis', id);
    return from(getDoc(docRef)).pipe(
      map(docSnap => docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Ci : null)
    );
  }

  remover(id: string): Observable<void> {
    const docRef = doc(this.firestore, 'cis', id);
    return from(deleteDoc(docRef));
  }

  atualizar(id: string, data: Partial<Ci>): Observable<void> {
    const docRef = doc(this.firestore, 'cis', id);
    return from(updateDoc(docRef, data));
  }

  inserir(ci: Ci): Observable<string> {
    const ciRef = collection(this.firestore, 'cis');
    return from(addDoc(ciRef, ci)).pipe(
      map(docRef => docRef.id)
    );
  }
}
