import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FiltrosAvanzadosModel,
  InitialConfigInputMaterial,
  ClaveValorModel,
} from '../../interfaces/FiltrosAvanzadosModel';
import { FormBuilder, FormGroup } from '@angular/forms';
export interface FiltrosAplicadosObjModel {
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
  //Supuesto modelo del backend
  public configuracionFiltrosAvanzados: FiltrosAvanzadosModel;
  public INDICE_MARCA: number = 0;
  public INDICE_MODELO: number = 1;
  public INDICE_ORIGEN: number = 2;
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
    //Tamanyo
    {
      type: 'chip',
      datos: [],
      configuracionInicial: this.obtainTamanyoConfig(),
    },
  ];

  //Almacenamiento de datos introducidos p or usuario y hooks
  private filtrosAplicadosFinales: FormGroup;
  private listaEfectosSecundarios: Array<SideEffectsOfEvent> = [];

  constructor(private fb: FormBuilder) {
    this.filtrosAplicadosFinales = this.fb.group({
      marca: ['', []],
      model: ['', []],
      origen: ['', []],
    });
  }

  ngOnInit(): void {
    this.listaEfectosSecundarios = [
      {
        keyId: 'marca',
        callback: (marca: string) => {
          this.configuracionesDeSelectores[
            this.INDICE_MODELO
          ].datos = this.generateModelsSelectorFromTradeMark(marca);
          this.configuracionesDeSelectores[
            this.INDICE_MODELO
          ].configuracionInicial.disabled = false;
        },
      },
    ];

    this.configuracionFiltrosAvanzados = {
      selectores: {
        marcas: [
          {
            marca: { clave: 'Oduman', valor: 'oduman' },
            modelos: [
              { clave: 'Modelo Oduman01', valor: 'modelo-oduman01' },
              { clave: 'Modelo Oduman02', valor: 'modelo-oduman02' },
            ],
          },
          {
            marca: { clave: 'Kaya', valor: 'kaya' },
            modelos: [],
          },
          {
            marca: { clave: 'Regal', valor: 'regal' },
            modelos: [{ clave: 'Model Regal01', valor: 'model-regal01' }],
          },
        ],
        origen: [
          {
            clave: 'Rusas',
            valor: 'rusia',
            bandera:
              'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/23px-Flag_of_Russia.svg.png',
          },
          {
            clave: 'Brasileñas',
            valor: 'brasil',
            bandera:
              'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png',
          },
          {
            clave: 'Tradicionales',
            valor: 'tradicional',
            bandera:
              'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/23px-Flag_of_Spain.svg.png',
          },
        ],
      },
      chipsPickers: {
        tamanyo: [
          { texto: 'Pequeña' },
          { texto: 'Intermedia' },
          { texto: 'Grande' },
          { texto: 'Tamaño americano' },
        ],
      },
    };

    this.configuracionesDeSelectores[
      this.INDICE_MARCA
    ].datos = this.obtainMarks();

    this.configuracionesDeSelectores[
      this.INDICE_ORIGEN
    ].datos = this.configuracionFiltrosAvanzados.selectores.origen;
  }

  public receiveChangedValue(claveValor: ClaveValorModel) {
    if (this.filtrosAplicadosFinales.get(claveValor.clave)) {
      this.filtrosAplicadosFinales
        .get(claveValor.clave)
        .patchValue(claveValor.valor);
      let busquedaEfectoSecundario = this.listaEfectosSecundarios.find(
        (entry) => entry.keyId === claveValor.clave
      );
      if (busquedaEfectoSecundario) {
        busquedaEfectoSecundario.callback(claveValor.valor);
      }
      console.log(this.filtrosAplicadosFinales);
    }
  }

  public obtainOnlySelectors(): Array<ConfiguracionComponentes> {
    return this.configuracionesDeSelectores.filter(
      (entry) => entry.type == 'selector'
    );
  }

  public obtainMarks(): Array<ClaveValorModel> {
    return this.configuracionFiltrosAvanzados.selectores.marcas.map(
      (entry) => entry.marca
    );
  }
  private generateModelsSelectorFromTradeMark(trademark: string) {
    return this.configuracionFiltrosAvanzados.selectores.marcas.find(
      (entry) => entry.marca.valor === trademark
    ).modelos;
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

  private obtainTamanyoConfig(): InitialConfigInputMaterial {
    return {
      idKey: 'tamanyo',
      label: 'Tamaño',
      disabled: false,
    };
  }
}
