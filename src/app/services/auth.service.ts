import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginCredentials } from '@chollohookah/generales-wrapper-lib';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { tap, map, shareReplay } from 'rxjs/operators';
import { LoginReponseDTO, User } from '../models/LoginResponseDTO';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { UTILS } from '../utils/Utils';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private toastService: ToastrService;
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId) {}
  public inyectToastService(toastService: ToastrService) {
    this.toastService = toastService;
  }

  public doLogin(ev: LoginCredentials): Observable<0 | 1> {
    return new Observable((observer) => {
      this.http
        .post(environment.protocol + '://' + environment.host + ':' + environment.port + '/' + environment.loginPath, {
          pass: ev.pass,
          email: ev.email,
        })
        .pipe(
          tap((res) => this.setSession(res as any)),
          shareReplay()
        )
        .subscribe(
          (data: LoginReponseDTO) => {
            this.toastService.success('Adelante, puedes pasar', 'Éxito');
            observer.next(0);
          },
          (err) => {
            this.toastService.error(err.error.error.message, 'Ha ocurrido un error');
            observer.next(1);
          }
        );
    });
  }

  public doRegister(ev: LoginCredentials): Observable<0 | 1> {
    return new Observable((observer) => {
      this.http
        .post(environment.protocol + '://' + environment.host + ':' + environment.port + '/' + environment.registerPath, {
          pass: ev.pass,
          email: ev.email,
          username: ev.email,
          name: ev.name,
        })
        .pipe(shareReplay())
        .subscribe(
          (data: User) => {
            observer.next(0);
          },
          (err) => {
            this.toastService.error(err.error.error.message, 'Ha ocurrido un error');
            observer.next(1);
          }
        );
    });
  }

  public doRecoveryPassword(email: string): Observable<0 | 1> {
    return new Observable((observer) => {
      this.http
        .post(environment.protocol + '://' + environment.host + ':' + environment.port + '/' + environment.resetPasswordInit, {
          email,
        })
        .pipe(shareReplay())
        .subscribe(
          (data: User) => {
            this.toastService.success('Te llegará un correo con instrucciones a seguir en un instante', 'Exito');
            observer.next(0);
          },
          (err) => {
            this.toastService.error(err.error.error.message, 'Ha ocurrido un error');
            observer.next(1);
          }
        );
    });
  }

  public doRecoveryPasswordEnd(resetKey: string, newPassEncripted: string): Observable<0 | 1> {
    return new Observable((observer) => {
      this.http
        .post(environment.protocol + '://' + environment.host + ':' + environment.port + '/' + environment.resetPasswordFinish, {
          resetKey,
          encriptedPass: newPassEncripted,
        })
        .pipe(shareReplay())
        .subscribe(
          (data: User) => {
            this.toastService.success('Tu contraseña ha sido cambiada exitosamente!', 'Exito');
            observer.next(0);
          },
          (err) => {
            this.toastService.error(err.error.error.message, 'Ha ocurrido un error');
            observer.next(1);
          }
        );
    });
  }

  private setSession(response: LoginReponseDTO) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(response);
      const expiresAt = moment().add(response.expiresIn, 'second');
      localStorage.setItem('id_token', response.token);
      localStorage.setItem('user_id', response.user.id);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }
  }

  public returnUserId() {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('user_id') : null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
    }
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    let expiration, expiresAt;
    if (isPlatformBrowser(this.platformId)) {
      expiration = localStorage.getItem('expires_at');
      expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    } else {
      return moment();
    }
  }
}
