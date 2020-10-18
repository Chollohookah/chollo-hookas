import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { InlineWorker } from '../../classes/InlineWorker';
import { ComparadorHookasIconoConfig, ComparadorHookasInputModel } from '../../interfaces/ComparadorHooksInputModel';
import { HookasWithSiteMetadata } from '../../interfaces/RelationSiteHooka';
import { HookaService } from '../../services/hooka-service.service';
import { BasicPaginatorChangeModel, EnvioHookasFiltradas } from './interfaces/BasicPaginatorChangeModel';

@Component({
  selector: 'lib-hooka-searcher-input',
  templateUrl: './hooka-searcher-input.component.html',
  styleUrls: ['./hooka-searcher-input.component.scss'],
})
export class HookaSearcherInputComponent implements OnInit {
  @Input() inputModel: ComparadorHookasInputModel;
  @Output() actualizarDesdeInput = new EventEmitter<EnvioHookasFiltradas>();
  @ViewChildren('inputBusqueda') inputBusqueda: QueryList<any>;

  public soloIconosConCondicionPositiva(arrayIconos: Array<ComparadorHookasIconoConfig>) {
    return arrayIconos.filter((entry) => entry.condition(this));
  }
  public set valorBusqueda(valor: string) {
    this._valorBusqueda = valor;
  }
  public get valorBusqueda() {
    return this._valorBusqueda;
  }
  private _valorBusqueda: string = '';
  public _self = this;

  constructor(private hookaService: HookaService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.escucharCambiosInput();
  }

  private escucharCambiosInput(): void {
    fromEvent(this.inputBusqueda.first.nativeElement, 'input')
      .pipe(debounceTime(500))
      .subscribe((data: any) => {
        this.valorBusqueda = data.target.value;
        this.realizarFiltro(data.target.value);
      });
  }

  private realizarFiltro(valorIntrocido: string) {
    const worker = new InlineWorker(() => {
      const filterHookas = (busqueda: string, todasCachimbas: Array<HookasWithSiteMetadata>) => {
        let res = todasCachimbas
          .map((entry) => JSON.stringify(entry))
          .filter((hookaStringed) => hookaStringed.toLowerCase().includes(busqueda.toLowerCase()))
          .map((entry) => JSON.parse(entry));
        // @ts-ignore
        this.postMessage({
          filtradas: res,
        });
      };

      // @ts-ignore
      this.onmessage = (evt) => {
        filterHookas(evt.data.busqueda, evt.data.allShisha);
      };
    });

    worker.postMessage({
      busqueda: valorIntrocido,
      allShisha: this.hookaService.copiaCachimbas,
    });

    worker.onmessage().subscribe((data) => {
      this.actualizarDesdeInput.emit({
        confPaginador: { pageIndex: 0, pageSize: this.hookaService.MAX_POR_PAGINA },
        resultadoFiltraje: data.data.filtradas,
      });
      worker.terminate();
    });

    worker.onerror().subscribe((data) => {
      console.log(data);
    });
  }
}
