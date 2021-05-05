import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials, RecoverCredentials, SimpleAlert } from '@chollohookah/generales-wrapper-lib';
import { cloneDeep } from 'lodash-es';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../services/auth.service';
import { AES } from 'crypto-js';
import { UTILS } from 'src/app/utils/Utils';
@Component({
  selector: 'app-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss'],
})
export class LoginWrapperComponent implements OnInit {
  public tipoACargar: 'login' | 'registro' | 'olvidada' | 'seteandoNuevaPass' = 'login';
  private resetKey: string = null;
  constructor(
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.inyectToastService(this.toast);
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data.resetKey) {
        this.resetKey = data.resetKey;
      }
      if (data.loadViewId) {
        const typeToLoad = () => {
          switch (data.loadViewId) {
            case '2':
              return 'registro';
            case '3':
              return 'olvidada';
            case '4':
              return 'seteandoNuevaPass';

            default:
              return 'login';
          }
        };
        this.tipoACargar = typeToLoad();
      }
    });
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  public handleLoginExitosoFront(ev: LoginCredentials) {
    this.authService.doLogin(ev).subscribe((data) => {
      if (data == 0) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  public handleRegistroExitosoFront(ev: LoginCredentials) {
    this.authService.doRegister(ev).subscribe((data) => {
      if (data == 0) {
        this.handleLoginExitosoFront(ev);
      }
    });
  }

  public handleRecuperarExitoso(ev: RecoverCredentials) {
    this.authService.doRecoveryPassword(ev.email).subscribe((data) => {
      if (data == 0) {
        this.tipoACargar = 'login';
        this.router.navigate(['login'], { replaceUrl: true, queryParams: { loadViewId: 1 } });
        location.reload();
      }
    });
  }

  public handleSeteoNuevaContrasenyaExitoso(ev: string) {
    if (this.resetKey && ev) {
      this.authService
        .doRecoveryPasswordEnd(this.resetKey, UTILS.universalBtoa(AES.encrypt(ev, environment.AES_KEY).toString()))
        .subscribe((data) => {
          if (data == 0) {
            this.tipoACargar = 'login';
            this.router.navigate(['login'], { replaceUrl: true, queryParams: { loadViewId: 1 } });
          }
        });
    } else {
      this.handleAlertHappen({ title: 'Error', type: 'danger', desc: 'La clave de reseteo o la contraseña no existen!' });
    }
  }

  public handleAlertHappen(ev: SimpleAlert) {
    this.toast[ev.type](ev.title, ev.desc, {});
  }
}
