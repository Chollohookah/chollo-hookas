import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials, SimpleAlert } from '@chollohookah/generales-wrapper-lib';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss'],
})
export class LoginWrapperComponent implements OnInit {
  constructor(private toast: ToastrService, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.authService.inyectToastService(this.toast);
  }

  ngOnInit(): void {}

  public handleLoginExitosoFront(ev: LoginCredentials) {
    this.authService.doLogin(ev).subscribe((data) => {
      if (data == 0) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  public handleAlertHappen(ev: SimpleAlert) {
    this.toast[ev.type](ev.title, ev.desc, {});
  }
}
