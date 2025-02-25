import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private colecao = 'funcionarios';

  constructor(private firestore: Firestore) {}

  async novo(funcionario: Funcionario): Promise<string> {
    const docRef = await addDoc(
      collection(this.firestore, this.colecao),
      funcionario
    );
    return docRef.id;
  }

  async altera(id: string, funcionario: Partial<Funcionario>): Promise<void> {
    const docRef = doc(this.firestore, `${this.colecao}/${id}`);
    await updateDoc(docRef, funcionario);
  }

  async remove(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.colecao}/${id}`);
    await deleteDoc(docRef);
  }

  async lista(): Promise<Funcionario[]> {
    const querySnapshot = await getDocs(
      collection(this.firestore, this.colecao)
    );
    return querySnapshot.docs.map(
      (doc: any) => ({ id: doc.id, ...doc.data() } as Funcionario)
    );
  }

  async recuperarPorId(id: string): Promise<Funcionario | undefined> {
    const docRef = doc(this.firestore, `${this.colecao}/${id}`);
    const docSnap = await getDoc(docRef);
    return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as Funcionario)
      : undefined;
  }

  async recuperarPorNome(nome: string): Promise<Funcionario[]> {
    const q = query(
      collection(this.firestore, this.colecao),
      where('nome', '==', nome)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc: any) => ({ id: doc.id, ...doc.data() } as Funcionario)
    );
  }
}
