import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '../../../../../environments/environment';
import {ResponseObject} from '../../../../models/ResponseObject.model';
import {User} from '../../../../models/User.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseURL = env.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public signUp(payload: Partial<User>): Observable<ResponseObject<User>> {
    return this.httpClient.post<ResponseObject<User>>(`${this.baseURL}/auth/register`, payload);
  }

  public login(payload: Partial<User>): Observable<ResponseObject<Partial<User>>> {
    return this.httpClient.post<ResponseObject<Partial<User>>>(`${this.baseURL}/auth/login`, payload);
  }

}
