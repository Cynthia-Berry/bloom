export interface ResponseObject<T> {
  data: T;
  status: string;
  token?: string
  message: Status;
}

export interface Pagination {
  detail?: string;
  count?: number;
  next?: string;
  previous?: string;
}

export interface LocalStorage {
  key: string;
  value: string;
}

export interface TokenData {
  user_id: string;
  iat: number;
  exp: number;
}

export enum Status {
  created = 'CREATED',
  failed = 'FAILED',
  success = 'SUCCESS'
}
