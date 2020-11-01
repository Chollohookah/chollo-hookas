import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import {
  FiltrosAvanzadosModel,
  InitialConfigInputMaterial,
  ClaveValorModel,
  ConfiguracionFiltrosAvanzadosMarcas,
  FiltrosAvanzadosChipPicker,
} from '../../interfaces/FiltrosAvanzadosModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HookaService } from '../../services/hooka-service.service';
import { cloneDeep } from 'lodash-es';
import { EnvioHookasFiltradas } from '../hooka-searcher-input/interfaces/BasicPaginatorChangeModel';
import { SliderComponentProps } from '../../../slider/slider.component';
export interface FiltrosAplicadosObjModel {
  inputValue: string;
  marca: string;
  modelo: string;
  etiquetasSeleccionadas: Array<string>;
  precioMin: number;
  precioMax: number;
}
export interface SideEffectsOfEvent {
  keyId: string;
  callback: Function;
}

export interface ConfiguracionComponentes {
  type: 'selector' | 'chip';
  datos: Array<ClaveValorModel>;
  configuracionInicial: InitialConfigInputMaterial;
}
@Component({
  selector: 'lib-filtros-avanzados',
  templateUrl: './filtros-avanzados.component.html',
  styleUrls: ['./filtros-avanzados.component.scss'],
})
export class FiltrosAvanzadosComponent implements OnInit {
  @Input('setNewTradeMarks') set setNewTradeMarks(data: Array<ConfiguracionFiltrosAvanzadosMarcas>) {
    if (data && data.length > 0) {
      this.configuracionFiltrosAvanzados.selectores.marcas = data;
      this.configuracionesDeSelectores[this.INDICE_MARCA].datos = this.obtainMarks();
    }
  }
  @Input('setNewChips') set setNewChips(data: FiltrosAvanzadosChipPicker) {
    if (data) {
      this.configuracionFiltrosAvanzados.chipsPickers = data;
    }
  }

  @Input('setNewSlider') set setNewSlider(data: SliderComponentProps) {
    if (data) {
      this.configuracionFiltrosAvanzados.sliderPrecio = data;
    }
  }

  @Output() actualizarDesdeSelectores = new EventEmitter<EnvioHookasFiltradas>();
  public configuracionFiltrosAvanzados: FiltrosAvanzadosModel;
  public INDICE_MARCA: number = 0;
  public INDICE_MODELO: number = 1;
  public INDICE_TAGS: number = 3;
  //Configuración selectores
  public configuracionesDeSelectores: Array<ConfiguracionComponentes> = [
    //Marcas
    {
      type: 'selector',
      datos: [],
      configuracionInicial: this.obtainMarksConfig(),
    },
    //Modelos
    {
      type: 'selector',
      datos: [],
      configuracionInicial: this.obtainModelsConfig(),
    },
  ];

  /* public sliderPrecios: SliderComponentProps = {
    value: 0,
    highValue: 100,
    options: { floor: 0, ceil: 200 },
  };*/

  //Almacenamiento de datos introducidos p or usuario y hooks
  private listaEfectosSecundarios: Array<SideEffectsOfEvent> = [];

  constructor(private hookaservice: HookaService) {}

  ngOnInit(): void {
    this.listaEfectosSecundarios = [
      {
        keyId: 'marca',
        callback: async (marca: string) => {
          this.configuracionesDeSelectores[this.INDICE_MODELO].datos = this.generateModelsSelectorFromTradeMark(marca);
          this.configuracionesDeSelectores[this.INDICE_MODELO].configuracionInicial.disabled = false;
          this.hookaservice.setFilterPropertyValue('modelo', '');
          let res: EnvioHookasFiltradas = await this.hookaservice.realizarFiltro();
          this.actualizarDesdeSelectores.emit(res);
        },
      },
    ];

    this.configuracionFiltrosAvanzados = {
      selectores: {
        marcas: [],
        origen: [],
      },
      chipsPickers: {
        tags: [],
      },
      sliderPrecio: null,
    };

    this.configuracionesDeSelectores[this.INDICE_MARCA].datos = this.obtainMarks();
  }

  public async receiveChangedValue(claveValor: ClaveValorModel) {
    if (claveValor.valor && this.hookaservice.filtrosAplicados[claveValor.clave] !== claveValor.valor) {
      let busquedaEfectoSecundario = this.listaEfectosSecundarios.find((entry) => entry.keyId === claveValor.clave);
      if (busquedaEfectoSecundario) {
        busquedaEfectoSecundario.callback(claveValor.valor);
      }
      this.hookaservice.setFilterPropertyValue(claveValor.clave as any, claveValor.valor);
      let res: EnvioHookasFiltradas = await this.hookaservice.realizarFiltro();
      this.actualizarDesdeSelectores.emit(res);
    }
  }

  public obtainOnlySelectors(): Array<ConfiguracionComponentes> {
    return this.configuracionesDeSelectores.filter((entry) => entry.type == 'selector');
  }

  public obtainMarks(): Array<ClaveValorModel> {
    return this.configuracionFiltrosAvanzados.selectores.marcas.map((entry) => entry.marca);
  }
  private generateModelsSelectorFromTradeMark(trademark: string) {
    return this.configuracionFiltrosAvanzados.selectores.marcas.find((entry) => entry.marca.valor === trademark).modelos;
  }

  private obtainMarksConfig(): InitialConfigInputMaterial {
    return {
      idKey: 'marca',
      label: 'Marcas',
      disabled: false,
    };
  }

  private obtainModelsConfig(): InitialConfigInputMaterial {
    return {
      idKey: 'modelo',
      label: 'Modelos',
      disabled: true,
    };
  }
}
