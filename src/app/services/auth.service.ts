import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '@tihomir22/generales-wrapper-lib';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { tap, map, shareReplay } from 'rxjs/operators';
import { LoginReponseDTO, User } from '../models/LoginResponseDTO';
import * as moment from 'moment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private toastService: ToastrService;
  constructor(private http: HttpClient) {}
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

  private setSession(response: LoginReponseDTO) {
    const expiresAt = moment().add(response.expiresIn, 'second');
    localStorage.setItem('id_token', response.token);
    localStorage.setItem('user_id', response.user.id);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public returnUserId() {
    return localStorage.getItem('user_id');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
