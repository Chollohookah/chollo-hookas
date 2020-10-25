import { Injectable } from '@angular/core';
import { cloneDeep, groupBy } from 'lodash-es';
import { Subject } from 'rxjs';
import { InlineBlockPicker } from '../../inline-block-picker/inline-block-picker.component';
import { InlineWorker } from '../classes/InlineWorker';
import { ConfiguracionFiltrosAvanzadosMarcas, FiltrosAvanzadosChipPicker } from '../interfaces/FiltrosAvanzadosModel';
import { HookasWithSiteMetadata } from '../interfaces/RelationSiteHooka';
import { FiltrosAplicadosObjModel } from '../sub-comps/filtros-avanzados/filtros-avanzados.component';
import { EnvioHookasFiltradas } from '../sub-comps/hooka-searcher-input/interfaces/BasicPaginatorChangeModel';

@Injectable({
  providedIn: 'root',
})
export class HookaService {
  public setFilterPropertyValue(property: 'marca' | 'modelo' | 'inputValue', value: any) {
    this.filtrosAplicados[property] = value;
    this.filterValuesChanged.next(this.filtrosAplicados);
  }
  public set filtrosAplicados(valor: FiltrosAplicadosObjModel) {
    this._filtrosAplicados = valor;
    this.filterValuesChanged.next(this._filtrosAplicados);
  }
  public get filtrosAplicados() {
    return this._filtrosAplicados;
  }
  private _filtrosAplicados: FiltrosAplicadosObjModel = {
    marca: '',
    modelo: '',
    inputValue: '',
  };
  public cachimbas: Array<HookasWithSiteMetadata> = [];
  public cachimbasSliced: Array<HookasWithSiteMetadata> = [];
  public copiaCachimbas: Array<HookasWithSiteMetadata> = [];
  public MAX_POR_PAGINA: number = 50;
  public PAGINA_ACTUAL: number = 0;
  public MAX_POR_PAGINA_POSIBILIDADES = [5, 25, this.MAX_POR_PAGINA, 100];
  public refrescarFiltrosAvanzados: Subject<void> = new Subject();
  public filterValuesChanged: Subject<FiltrosAplicadosObjModel> = new Subject();
  constructor() {}

  public realizarFiltro(): Promise<EnvioHookasFiltradas> {
    return new Promise((resolve, reject) => {
      const worker = new InlineWorker(() => {
        const filterHookas = (busqueda: FiltrosAplicadosObjModel, todasCachimbas: Array<HookasWithSiteMetadata>) => {
          let res = todasCachimbas;
          if (busqueda.inputValue && busqueda.inputValue != '') {
            res = res
              .map((entry) => JSON.stringify(entry))
              .filter((hookaStringed) => hookaStringed.toLowerCase().includes(busqueda.inputValue.toLowerCase()))
              .map((entry) => JSON.parse(entry));
          }

          if (busqueda.marca && busqueda.marca != '') {
            res = res.filter((entry) => entry.marca.toLowerCase().includes(busqueda.marca.toLowerCase()));
          }

          if (busqueda.modelo && busqueda.modelo != '') {
            res = res.filter((entry) => entry.modelo.toLowerCase().includes(busqueda.modelo.toLowerCase()));
          }

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
        busqueda: this.filtrosAplicados,
        allShisha: this.copiaCachimbas,
      });

      let subscription = worker.onmessage().subscribe((data) => {
        resolve({
          confPaginador: { pageIndex: 0, pageSize: this.MAX_POR_PAGINA },
          resultadoFiltraje: data.data.filtradas,
        });
        setTimeout(() => {
          this.refrescarFiltrosAvanzados.next();
        }, 0);
        subscription.unsubscribe();
        worker.terminate();
      });

      let subscription2 = worker.onerror().subscribe((data) => {
        reject(data);
        subscription2.unsubscribe();
      });
    });
  }

  public obtainTradeMarkAndModel(hookas: Array<HookasWithSiteMetadata>) {
    let objAgrupado = groupBy(hookas, 'marca');
    return cloneDeep(
      Object.keys(objAgrupado).reduce((prev, current, index) => {
        prev.push({
          marca: { clave: current, valor: current.toLowerCase() },
          modelos: objAgrupado[current].map((entry) => {
            let modelo = entry.modelo;
            return { clave: modelo, valor: modelo.toLowerCase() };
          }),
        } as ConfiguracionFiltrosAvanzadosMarcas);
        return prev;
      }, [])
    );
  }

  public obtainTagsFromHookas(hookas: Array<HookasWithSiteMetadata>): FiltrosAvanzadosChipPicker {
    let etiquetasUnificadas = hookas.reduce((prev, current, index) => {
      prev.push(
        ...current.etiquetas.map((entry) => {
          return { texto: entry } as InlineBlockPicker;
        })
      );
      prev = [...new Set(prev)];
      return prev;
    }, []);

    return {
      tags: etiquetasUnificadas,
    };
  }
}
