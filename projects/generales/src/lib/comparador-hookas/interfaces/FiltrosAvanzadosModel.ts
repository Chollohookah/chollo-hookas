import { InlineBlockPicker } from '../../inline-block-picker/inline-block-picker.component';

export interface FiltrosAvanzadosModel {
  selectores: FiltrosAvanzadosSelectoresModel;
  chipsPickers: FiltrosAvanzadosChipPicker;
}

export interface FiltrosAvanzadosSelectoresModel {
  marcas: Array<ConfiguracionFiltrosAvanzadosMarcas>;
  origen: Array<ClaveValorBandera>;
}

export interface FiltrosAvanzadosChipPicker {
  tamanyo: Array<InlineBlockPicker>;
}

export interface ConfiguracionFiltrosAvanzadosMarcas {
  marca: ClaveValorModel;
  modelos: Array<ClaveValorModel>;
}

export interface InitialConfigInputMaterial {
  idKey: string;
  label: string;
  disabled: boolean;
  customCssClass?: string;
}

export interface ConfiguracionTotalSelector {
  datos: Array<ClaveValorModel>;
  configuracionInicial: InitialConfigInputMaterial;
}

export interface ClaveValorModel {
  clave: string;
  valor: any;
}

export interface ClaveValorBandera extends ClaveValorModel {
  bandera?: string;
}
