import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class CiService {
  saveRecord(data: Funcionario): Promise<void> {
    return new Promise((resolve, reject) => {
      // implementation
      resolve();
    });
  }
  sendEmail(data: any) {
    throw new Error('Method not implemented.');
  }

  constructor() {}
}
