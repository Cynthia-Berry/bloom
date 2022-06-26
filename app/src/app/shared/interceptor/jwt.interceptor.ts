import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Storage} from '@capacitor/storage'

import {environment as env} from '../../../environments/environment';
import {AuthService} from '../services/api/auth/auth.service';
import {StorageService} from '../services/storage.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
  }

  /* intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if (JwtInterceptor.isInBlockedList(request.url)) {
       console.log('HERE#######')

       return next.handle(request).pipe(
         catchError((err: any) => throwError(err))
       );
     } else {
       return from(this.storageService.getTokenAsObservable()).pipe(
         mergeMap((token) => {
             console.log(token)
             const changedReq = request.clone({
               setHeaders: {
                 Authorization: `Bearer ${token}`
               }
             });

             return next.handle(changedReq);
           }
         ),
         catchError((err: any) =>
           // if (err.status === 401) this._authService.Logout();
           throwError(err)
         )
       );

       // return next.handle(this.addToken(request)).pipe(
       //   catchError((err: any) =>
       //     // if (err.status === 401) this._authService.Logout();
       //     throwError(err)
       //   )
       // );
     }
   }

   // Filter out URLs where you don't want to add the token!
   private static isInBlockedList(url: string): boolean {
     return url === `${env.apiUrl}/auth/login` || url === `${env.apiUrl}/auth/register`;
   }*/


  // Filter out URLs where you don't want to add the token!
  private static isInBlockedList(url: string): boolean {
    return url === `${env.apiUrl}/auth/login` || url === `${env.apiUrl}/auth/register`;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Check if we need additional token logic or not
    if (JwtInterceptor.isInBlockedList(request.url)) {
      return next.handle(request).pipe(
        catchError((err: any) => throwError(err))
      );
    } else {
      return next.handle(this.addToken(request)).pipe(
        catchError((err: any) => {
          if (err.status === (401)) {
            Storage.clear().then(async () => {
              await this.router.navigateByUrl('/auth/login')
            })
          }
          return throwError(err);
        })
      );
    }
  }

  private addToken(req: HttpRequest<any>) {
    const token = this.storageService.getToken();

    if (!token) {
      this.router.navigateByUrl('/auth/login');
      return req;
    } else {
      return req.clone({headers: req.headers.set('Authorization', `JWT ${token}`)});
    }
  }
}
