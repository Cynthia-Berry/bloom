import {Storage} from '@capacitor/storage';
import {Injectable} from '@angular/core';
import {EncryptionService} from "./encryption.service";
import {from, of, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private tokenSubject: Subject<string> = new Subject<string>()

  constructor() {
  }

  /*  public saveToken(token: string) {
      const encryptToken = EncryptionService.encrypt(token);
      return Storage.set({key: 'token', value: encryptToken})
    }

    public getTokenAsObservable() {
      return this.tokenSubject;
    }

    public getToken() {
       Storage.get({key: 'token'}).then(token => {
        this.tokenSubject.next(EncryptionService.decrypt(token.value))
      })
    }*/

  public getUser() {

  }

  public saveToken(token: string) {
    const encryptToken = EncryptionService.encrypt(token);
    return localStorage.setItem('token', encryptToken)
    // return Storage.set();
  }

  public getTokenAsObservable() {
    return of(this.getToken());
  }

  public getToken() {
    const token = localStorage.getItem('token')
    return EncryptionService.decrypt(token);
  }

}
