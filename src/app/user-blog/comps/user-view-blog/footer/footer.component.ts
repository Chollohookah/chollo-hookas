import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  GenericDialogComponent,
  TermsUseComponent,
  GenericDialog,
  PrivacyTermsComponent,
  ButtonActionFunction,
  SimpleAlert,
} from '@chollohookah/generales-wrapper-lib';
import { ToastrService } from 'ngx-toastr';
import { AvalaibleItemTypes } from 'src/app/landing/components/base-landing/static/avalaible-item-types.const';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public mailToContact = '';
  public avalaibleItemsPt1 = AvalaibleItemTypes.slice(0, (AvalaibleItemTypes.length - 1) / 2);
  public avalaibleItemsPt2 = AvalaibleItemTypes.slice((AvalaibleItemTypes.length - 1) / 2, AvalaibleItemTypes.length - 1);
  public fnBtnClick: ButtonActionFunction = {
    type: 'async',
    succesMessage: 'Ya tenemos tu correo :)!',
    function: (email: string) => {
      return this.http
        .post(environment.protocol + '://' + environment.host + ':' + environment.port + '/emails', { email: email })
        .toPromise();
    },
  };

  constructor(private matDialog: MatDialog, private toast: ToastrService, private http: HttpClient) {}

  ngOnInit(): void {
    this.mailToContact = environment.mail;
    console.log([this.avalaibleItemsPt1, this.avalaibleItemsPt2]);
  }

  public abrirTerminosUso(): void {
    this.matDialog.open(GenericDialogComponent, {
      width: '1200px',
      data: {
        title: null,
        component: TermsUseComponent,
        actionButtons: [],
      } as GenericDialog,
    });
  }

  public abrirPoliticaPrivacidad() {
    this.matDialog.open(GenericDialogComponent, {
      width: '1200px',
      data: {
        title: null,
        component: PrivacyTermsComponent,
        actionButtons: [],
      } as GenericDialog,
    });
  }

  public submitSubscribe(event) {
    event.preventDefault();
  }

  public printToast(ev: SimpleAlert) {
    this.toast[ev.type](ev.title, ev.desc, {});
  }

  public gotoTop() {
    let top = document.getElementsByClassName('fondo');
    if (top && top.length > 0) top[0].scrollIntoView({ behavior: 'smooth' });
  }
}
