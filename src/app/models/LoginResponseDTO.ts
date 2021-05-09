export interface LoginReponseDTO {
  user: User;
  token: string;
  expiresIn: number;
}

export interface User {
  username: string;
  pass: string;
  id: string;
  name: string;
  rols: Array<Rol>;
}

export interface Rol {
  codigo: string;
  id: string;
  nombre: string;
}
