import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ComparadorHookasInputModel } from './interfaces/ComparadorHooksInputModel';
import { Site, Hooka } from './interfaces/ModeloHookasBack';
import { HookasWithSiteMetadata } from './interfaces/RelationSiteHooka';
import { cloneDeep } from 'lodash-es';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'lib-comparador-hookas',
  templateUrl: './comparador-hookas.component.html',
  styleUrls: ['./comparador-hookas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparadorHookasComponent implements OnInit {
  @Input() set comparadorHookas(model: ComparadorHookasInputModel) {
    if (model) {
      this._model = model;
    }
  }

  public _model: ComparadorHookasInputModel;
  public _peticionCargaHookasTerminada: boolean = false;
  public cachimbas: Array<HookasWithSiteMetadata> = [];
  public copiaCachimbas: Array<HookasWithSiteMetadata> = [];
  public MAX_POR_PAGINA: number = 50;
  public PAGINA_ACTUAL: number = 0;
  public MAX_POR_PAGINA_POSIBILIDADES = [5, 25, this.MAX_POR_PAGINA, 100];

  public set peticionCargaHookasTerminada(valor: boolean) {
    this._peticionCargaHookasTerminada = valor;
  }
  public get peticionCargaHookasTerminada() {
    return this._peticionCargaHookasTerminada;
  }

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarHookasGenerales();
  }

  public cambioPaginaPaginador(event: PageEvent) {
    this.PAGINA_ACTUAL = event.pageIndex + 1;
    this.MAX_POR_PAGINA = event.pageSize;
    let punteroMAximoArray = this.PAGINA_ACTUAL * this.MAX_POR_PAGINA;
    let punteroInicial = punteroMAximoArray - this.MAX_POR_PAGINA;
    this.cachimbas = this.copiaCachimbas.slice(
      punteroInicial,
      punteroMAximoArray
    );
    this.changeDetectorRef.markForCheck();
  }

  public reajustarArrayDepndiendoPagina(): void {}

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
          let res = data.reduce((prev, current, index) => {
            prev.push(
              ...current.data.map((entry: HookasWithSiteMetadata) => {
                entry.logoCompany = current.logo;
                entry.nameCompany = current.name;
                return entry;
              })
            );
            return prev;
          }, []);
          this.cachimbas = res;
          this.copiaCachimbas = cloneDeep(this.cachimbas);
          this.cachimbas.length = this.MAX_POR_PAGINA;

          this.changeDetectorRef.markForCheck();
        },
        (error) => {
          this.peticionCargaHookasTerminada = true;
          this.toastr.error('Ha ocurrido un error', error);
        }
      );
  }
}
