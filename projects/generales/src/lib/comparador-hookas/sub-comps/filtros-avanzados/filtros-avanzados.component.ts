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
export interface FiltrosAplicadosObjModel {
  inputValue: string;
  marca: string;
  modelo: string;
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
  @Output() actualizarDesdeSelectores = new EventEmitter<EnvioHookasFiltradas>();
  public configuracionFiltrosAvanzados: FiltrosAvanzadosModel;
  public INDICE_MARCA: number = 0;
  public INDICE_MODELO: number = 1;
  public INDICE_ORIGEN: number = 2;
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
    //Origen
    {
      type: 'selector',
      datos: [],
      configuracionInicial: this.obtainOrigenConfig(),
    },
  ];

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
        origen: [
          /* {
            clave: 'Rusas',
            valor: 'rusia',
            bandera: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/23px-Flag_of_Russia.svg.png',
          },
          {
            clave: 'Brasileñas',
            valor: 'brasil',
            bandera: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png',
          },
          {
            clave: 'Tradicionales',
            valor: 'tradicional',
            bandera: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/23px-Flag_of_Spain.svg.png',
          },*/
        ],
      },
      chipsPickers: {
        tags: [],
      },
    };

    this.configuracionesDeSelectores[this.INDICE_MARCA].datos = this.obtainMarks();

    this.configuracionesDeSelectores[this.INDICE_ORIGEN].datos = this.configuracionFiltrosAvanzados.selectores.origen;
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

  private obtainOrigenConfig(): InitialConfigInputMaterial {
    return {
      idKey: 'origen',
      label: 'Origen',
      disabled: false,
    };
  }

  private obtainTagsConfig(): InitialConfigInputMaterial {
    return {
      idKey: 'tags',
      label: 'Tags',
      disabled: false,
    };
  }
}
