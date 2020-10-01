import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ComparadorHookasInputModel } from './interfaces/ComparadorHooksInputModel';
import { Site, Hooka } from './interfaces/ModeloHookasBack';

@Component({
  selector: 'lib-comparador-hookas',
  templateUrl: './comparador-hookas.component.html',
  styleUrls: ['./comparador-hookas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComparadorHookasComponent implements OnInit {
  @Input() set comparadorHookas(model: ComparadorHookasInputModel) {
    if (model) {
      this._model = model;
    }
  }

  public _model: ComparadorHookasInputModel;
  public _peticionCargaHookasTerminada: boolean = false;
  public cachimbas: Array<Hooka> = [];

  public set peticionCargaHookasTerminada(valor: boolean) {
    this._peticionCargaHookasTerminada = valor;
  }
  public get peticionCargaHookasTerminada() {
    return this._peticionCargaHookasTerminada;
  }

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.cargarHookasGenerales();
  }

  private cargarHookasGenerales(): void {
    this.peticionCargaHookasTerminada = false;
    this.http
      .get(
        `${environment.protocol}://${
          environment.host + ':' + environment.port
        }/sites`
      )
      .subscribe(
        (data: Array<Site>) => {
          this.peticionCargaHookasTerminada = true;
          this.cachimbas = data.reduce((prev, current) => {
            prev.push(...current.data);
            return prev;
          }, []);
        },
        (error) => {
          this.peticionCargaHookasTerminada = true;
          this.toastr.error('Ha ocurrido un error', error);
        }
      );
  }
}
