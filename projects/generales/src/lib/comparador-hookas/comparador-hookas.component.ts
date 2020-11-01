import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ComparadorHookasIconoConfig, ComparadorHookasInputModel } from './interfaces/ComparadorHooksInputModel';
import { Site, Hooka } from './interfaces/ModeloHookasBack';
import { HookasWithSiteMetadata } from './interfaces/RelationSiteHooka';
import { cloneDeep } from 'lodash-es';
import { PageEvent } from '@angular/material/paginator';
import { HookaService } from './services/hooka-service.service';
import { groupBy } from 'lodash-es';
import { ConfiguracionFiltrosAvanzadosMarcas, FiltrosAvanzadosChipPicker } from './interfaces/FiltrosAvanzadosModel';
import { EventEmitter } from '@angular/core';
import { FiltrosAplicadosObjModel } from './sub-comps/filtros-avanzados/filtros-avanzados.component';
import { SliderComponentProps } from '../slider/slider.component';
@Component({
  selector: 'lib-comparador-hookas',
  templateUrl: './comparador-hookas.component.html',
  styleUrls: ['./comparador-hookas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparadorHookasComponent implements OnInit {
  @Input() inputModel: ComparadorHookasInputModel;
  public tradeMarksWithModelsSelectores: Array<ConfiguracionFiltrosAvanzadosMarcas> = [];
  public tagsChips: FiltrosAvanzadosChipPicker;
  public priceSlider: SliderComponentProps;

  public set peticionCargaHookasTerminada(valor: boolean) {
    this._peticionCargaHookasTerminada = valor;
  }
  public get peticionCargaHookasTerminada() {
    return this._peticionCargaHookasTerminada;
  }

  private _peticionCargaHookasTerminada: boolean = false;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public hookaService: HookaService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarHookasGenerales();
  }

  public cambioPaginaPaginador(event: PageEvent, specificArray?: Array<HookasWithSiteMetadata>) {
    this.hookaService.PAGINA_ACTUAL = event.pageIndex + 1;
    this.hookaService.MAX_POR_PAGINA = event.pageSize;
    let punteroMAximoArray = this.hookaService.PAGINA_ACTUAL * this.hookaService.MAX_POR_PAGINA;
    let punteroInicial = punteroMAximoArray - this.hookaService.MAX_POR_PAGINA;
    this.hookaService.cachimbas = cloneDeep(specificArray ? specificArray : this.hookaService.copiaCachimbas);
    this.hookaService.cachimbasSliced = (specificArray ? specificArray : this.hookaService.copiaCachimbas).slice(
      punteroInicial,
      punteroMAximoArray
    );

    this.changeDetectorRef.markForCheck();
  }

  private cargarHookasGenerales(): void {
    this.peticionCargaHookasTerminada = false;
    this.http.get(`${environment.protocol}://${environment.host + ':' + environment.port}/sites`).subscribe(
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
        this.hookaService.cachimbas = res;
        this.hookaService.cachimbasSliced = cloneDeep(this.hookaService.cachimbas);
        this.hookaService.copiaCachimbas = cloneDeep(this.hookaService.cachimbas);
        this.hookaService.cachimbasSliced.length = this.hookaService.MAX_POR_PAGINA;
        this.obtainMetadataFromHookas(this.hookaService.cachimbas);
        this.changeDetectorRef.markForCheck();
      },
      (error) => {
        this.peticionCargaHookasTerminada = true;
        this.toastr.error('Ha ocurrido un error', error.message);
        this.changeDetectorRef.markForCheck();
      }
    );
  }

  private obtainMetadataFromHookas(hookas: Array<HookasWithSiteMetadata>) {
    this.tradeMarksWithModelsSelectores = this.hookaService.obtainTradeMarkAndModel(hookas);
    this.tagsChips = this.hookaService.obtainTagsFromHookas(hookas);
    this.priceSlider= this.hookaService.obtainMininumAndMaxinumPrice(hookas);
  }
}
