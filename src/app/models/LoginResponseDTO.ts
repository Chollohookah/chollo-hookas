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
}
