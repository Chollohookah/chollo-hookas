import { Injectable } from '@angular/core';
import { HookasWithSiteMetadata } from '../interfaces/RelationSiteHooka';
import { FiltrosAplicadosObjModel } from '../sub-comps/filtros-avanzados/filtros-avanzados.component';

@Injectable({
  providedIn: 'root',
})
export class HookaService {
  public filtrosAplicados: FiltrosAplicadosObjModel;
  public cachimbas: Array<HookasWithSiteMetadata> = [];
  public cachimbasSliced: Array<HookasWithSiteMetadata> = [];
  public copiaCachimbas: Array<HookasWithSiteMetadata> = [];
  public MAX_POR_PAGINA: number = 50;
  public PAGINA_ACTUAL: number = 0;
  public MAX_POR_PAGINA_POSIBILIDADES = [5, 25, this.MAX_POR_PAGINA, 100];
  constructor() {}
}
