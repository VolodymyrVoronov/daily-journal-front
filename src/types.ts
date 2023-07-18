export enum RouterPath {
  Start = '/',
  Journal = '/journal',
}

export enum Key {
  Escape = 'Escape',
}

export interface IFormData {
  login: string;
  password: string;
  confirmPassword: string;
}

export enum Form {
  Login = 'login',
  Register = 'register',
}

export type FormType = Form.Login | Form.Register;

export enum Token {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export interface IAuthentication {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IUser {
  data: {
    id: string;
    login: string;
    password: null;
    createAt: Date;
  };
}

export interface IJournal {
  id: string;
  title: string;
  text: string;
  favorite: boolean;
  year: number;
  month: number;
  day: number;
  createdAt: Date;
  updatedAt: Date;
  user?: any;
  userId: string;
}

export interface IJournals {
  data: IJournal[];
}

export interface IRes {
  data: {
    status: number;
    message: string;
  };
}

export interface ICreate extends IRes {}
export interface IDelete extends IRes {}
export interface IAddToFavorite extends IRes {}
export interface IUpdate extends IRes {}
