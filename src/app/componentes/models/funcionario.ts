export interface Funcionarios {
  funcionarios: Funcionario[];
}
export interface Funcionario {
  id?: string;
  matricula: string;
  nome: string;
  cargo: string;
  perfil: string;
  senha: string;
}
