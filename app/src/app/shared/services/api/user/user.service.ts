import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {User} from "../../../../models/User.model";
import {environment as env} from "../../../../../environments/environment";
import {ResponseObject} from "../../../../models/ResponseObject.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = env.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getUser(id: string): Observable<ResponseObject<User>> {
    return this.httpClient.get<ResponseObject<User>>(`${this.baseURL}/user/${id}`);
  }
}
