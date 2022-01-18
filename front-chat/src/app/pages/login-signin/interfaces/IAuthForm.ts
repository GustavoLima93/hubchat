export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthFormResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}
