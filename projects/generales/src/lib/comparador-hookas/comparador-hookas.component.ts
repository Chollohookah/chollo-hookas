import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  QueryList,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ComparadorHookasInputModel } from './interfaces/ComparadorHooksInputModel';
import { Site, Hooka } from './interfaces/ModeloHookasBack';
import { HookasWithSiteMetadata } from './interfaces/RelationSiteHooka';
import { cloneDeep } from 'lodash-es';
import { PageEvent } from '@angular/material/paginator';
import { PosibleActions } from '../lateral-actions/models/PosibleActions';
import { fromEvent, Observable, of, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ViewChildren } from '@angular/core';
import { WorkerManagerService } from '../servicios/worker-manager.service';

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

  @ViewChildren('inputBusqueda') inputBusqueda: QueryList<any>;

  public _model: ComparadorHookasInputModel;
  public cachimbas: Array<HookasWithSiteMetadata> = [];
  public copiaCachimbas: Array<HookasWithSiteMetadata> = [];
  public MAX_POR_PAGINA: number = 50;
  public PAGINA_ACTUAL: number = 0;
  public MAX_POR_PAGINA_POSIBILIDADES = [5, 25, this.MAX_POR_PAGINA, 100];

  public set valorBusqueda(valor: string) {
    this._valorBusqueda = valor;
  }
  public get valorBusqueda() {
    return this._valorBusqueda;
  }

  public set peticionCargaHookasTerminada(valor: boolean) {
    this._peticionCargaHookasTerminada = valor;
  }
  public get peticionCargaHookasTerminada() {
    return this._peticionCargaHookasTerminada;
  }

  private _peticionCargaHookasTerminada: boolean = false;
  private _valorBusqueda: string = '';
  private workerInstance: Worker;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private workerS: WorkerManagerService
  ) {}

  ngOnInit(): void {
    this.cargarHookasGenerales();
  }
  ngAfterViewInit(): void {
    this.escucharCambiosInput();
  }

  private escucharCambiosInput(): void {
    fromEvent(this.inputBusqueda.first.nativeElement, 'input')
      .pipe(debounceTime(500))
      .subscribe((data) => {
        if (!this.workerInstance) {
          this.workerInstance = this.workerS.generateWorker(
            '../web-workers/web-workers'
          );
        }
        if (this.workerInstance) {
          this.workerInstance.postMessage('hello');
          this.workerInstance.onmessage = ({ data }) => {
            console.log(data);
          };
          
        }
      });
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
